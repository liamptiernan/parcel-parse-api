const fetch = require('node-fetch');
const { Op } = require('sequelize');

const insert = require('../db/insert');
const parser = require('./parsers/parcel-parser');
const requests = require('./requests/requests');
const select = require('../db/select');
const upsert = require('../db/upsert');

async function fetchHtml(searchKey) {
  /*
   * Fetches list of properties using the search key
   */

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

function dataToRecord(parcelData) {
  // for each section
  // transform column names into field names (lowercase, underscores, no paren)
  // assign values to each column name accordingly

  const record = {};
  
  for (const section of parcelData) {
    const keys = Object.keys(section.data);
    for (const key of keys) {
      const newKey = formatKey(key);
      record[newKey] = section.data[key];
    }
  }

  return record;
}

async function updateParcel(data) {
  // create parcel record and write to db
  // create sub records and write to db with parcel id

  const subSections = ['Improvements', 'Entrance'];
  const salesSections = ['Sales History', 'Additional Information']
  const parcelData = data.filter(section => !subSections.includes(section.id) || !salesSections.includes(section.id));
  const subData = data.filter(section => subSections.includes(section.id));
  const salesData = data.filter(section => salesSections.includes(section.id));

  const parcelRecord = dataToRecord(parcelData);
  return await upsert.parcel(parcelRecord);
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
    const res = await fetchHtml(id);
    const data = await parser.parseParcel(res)

    const update = await updateParcel(data);
    updates.push(update[0].id)
  }
  return updates;
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
