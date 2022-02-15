const fetch = require('node-fetch');
const { Op } = require('sequelize');

const insert = require('../db/insert');
const parser = require('./parsers/parcel-parser');
const requests = require('./requests/requests');
const select = require('../db/select');
const upsert = require('../db/upsert');

function stringToNumber () {

}

async function fetchHtml(searchKey) {
  /*
   * Fetches list of properties using the search key
   */
  console.log(`fetching html of ${searchKey}`)

  const req = requests.parcelRequest(searchKey);
  const res = await fetch(req.url, req.params);

  const text = await res.text();
  return text;
}

function formatKey(key) {
  /*
   * converts spaces and '/' to underscores, removes parentheses, and tolowercase
  */

  const parenCheck = key.indexOf('(');
  let newKey = parenCheck > 0 ? key.slice(0, parenCheck) : key;
  newKey = newKey.trim().replace(/ |\//gm,'_');
  return newKey.toLowerCase();
}

function createSubRecords(subData, parcels_id) {
  /*
   * returns object with table names and arrays of cleaned records to be inserted
   */
  
  const numberFields = ['Area/Quantity'];

  const insert = {};

  for (const section of subData) {
    const newRecords = section.data.map(record => {
      const updatedRecord = {};

      
      const keys = Object.keys(record);
      for (const key of keys) {
        const newKey = formatKey(key);
        if (key === 'Inspection Date') {
          updatedRecord[newKey] = new Date(record[key]);
        } else if (numberFields.includes(key)) {
          const cleanKey = record[key].replace(/\D/gm,'');
          updatedRecord[newKey] = cleanKey;
        } else {
          updatedRecord[newKey] = record[key];
        }
      }
      
      updatedRecord['MonroeParcelId'] = parcels_id;

      return updatedRecord;
    })

    insert[section.id] = newRecords;
  }

  return insert;
}

function createSaleRecords(data, parcels_id) {
  /*
   * add additional info to sales history
   * for sales history, convert to db fields
   */

  const numberFields = ['Amount', 'Book', 'Page'];
  const addtData = data.filter(section => section.id === 'Additional Information')[0];
  const salesData = data.filter(section => section.id === 'Sales History')[0];
  
  const newRecords = [];
  for (const record of salesData.data) {
    const updatedRecord = {};

    if (record['Date'] === addtData.data['Date']) {
      record.grantor = addtData.data['Grantor'];
      record.grantee = addtData.data['Grantee'];
    }

    
    const keys = Object.keys(record);
    for (const key of keys) {
      const newKey = formatKey(key);
      if (key === 'Date') {
        updatedRecord[newKey] = new Date(record[key]);
      } else if (numberFields.includes(key)) {
        const cleanKey = record[key].replace(/\D/gm,'');
        updatedRecord[newKey] = cleanKey;
      } else {
        updatedRecord[newKey] = record[key];
      }
    }
    
    updatedRecord['MonroeParcelId'] = parcels_id;
    newRecords.push(updatedRecord);
  }

  return newRecords;
}

function dataToRecord(parcelData) {
  // for each section
  // transform column names into field names (lowercase, underscores, no paren)
  // assign values to each column name accordingly
  const numberFields = [
    'Living Units', 
    'Land Area (Acreage)',
    'Year Built',
    'Year Remodeled',
    'Stories',
    'Fireplaces',
    'Total Rooms',
    'Bedrooms',
    'Full Baths',
    'Half Baths',
    'Basement Garage Spaces',
    'Finished Basement Area',
    'Basement Rec Room Area',
    'Living Area'
  ]
  const record = {};
  
  for (const section of parcelData) {
    const keys = Object.keys(section.data);

    for (const key of keys) {
      const newKey = formatKey(key);

      if (numberFields.includes(key)) {
        let cleanKey = Number(key);
        if (isNaN(cleanKey)) {
          cleanKey = record[key].replace(/\D/gm,'');
        }
        updatedRecord[newKey] = cleanKey;
      }

      record[newKey] = section.data[key];
    }
  }

  return record;
}

async function updateParcel(data) {
  // create parcel record and write to db
  // create sub records and write to db with parcel id
  console.log('updating parcel')
  const subSections = ['Improvements', 'Entrance'];
  const salesSections = ['Sales History', 'Additional Information']
  const parcelData = data.filter(section => !subSections.includes(section.id) && !salesSections.includes(section.id));
  const subData = data.filter(section => subSections.includes(section.id));
  const salesData = data.filter(section => salesSections.includes(section.id));

  const parcelRecord = dataToRecord(parcelData);
  const parcelWrite = await upsert.parcel(parcelRecord);
  const parcels_id = parcelWrite[0].dataValues.id;
  
  const saleRecords = createSaleRecords(salesData, parcels_id);
  const subRecords = createSubRecords(subData, parcels_id);

  if (subRecords['Improvements']) {
    await insert.improvement(subRecords['Improvements']);
  }

  if (subRecords['Entrance']) {
    await insert.entrance(subRecords['Entrance']);
  }

  await insert.sale(saleRecords);

  return parcelWrite;
}

async function getParcels(params) {
  /*
   * accepts array of ids to parse or min max of db primary keys
   * SELECTS records from db accordingly and pings parcel info page with key
   * parses resposne and updates or inserts into db
   */

  let ids = params.ids;
  if (!ids) {
    const query = await select.parcel({
      attributes: [
        'parcel_id'
      ],
      where: {
        id: {
          [Op.gte]: params.pkMin,
          [Op.lte]: params.pkMax          
        }
      }
    })

    ids = query.map(record => record.dataValues.parcel_id);
  }

  const updates = [];
  for (const id of ids) {
    try {
      const res = await fetchHtml(id);
      const data = await parser.parseParcel(res)

      const update = await updateParcel(data);
      updates.push(update[0].id)
      console.log(`${ids.length-updates.length} updates remaining`)
    } catch (err) {
      console.log(err);
    }
  }
  return ids;
}

async function getHeaders(params) {
  let ids = params.ids;
  if (!ids) {
    const query = await select.parcel({
      attributes: [
        'parcel_id'
      ],
      where: {
        id: {
          [Op.gte]: params.pkMin,
          [Op.lte]: params.pkMax          
        }
      }
    })

    ids = query.map(record => record.dataValues.parcel_id);
  }

  let records = [];

  for (let i = 0; i < ids.length; i++) {
    const res = await fetchHtml(ids[i]);
    const parsed = await parser.parseHeaders(res);
    records = records.concat(parsed);
  }

  await insert.header(records);
}

module.exports = ({ getParcels, getHeaders });
