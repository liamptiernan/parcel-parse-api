const fetch = require('node-fetch');

const insert = require('../db/insert');
const { Op } = require('sequelize');
const parser = require('./parsers/parcel-parser');
const requests = require('./requests/requests');
const select = require('../db/select');

async function fetchHtml(searchKey) {
  /*
   * Fetches list of properties using the search key
   */

  const req = requests.parcelRequest(searchKey);
  const res = await fetch(req.url, req.params);

  const text = await res.text();
  return text;
}

async function getParcels(params) {
  /*
   * accepts array of ids to parse or min max of db primary keys
   * SELECTS records from db accordingly and pings parcel info page with key
   * parses resposne and updates or inserts into db
   */

  let ids = params.ids;
  if (!ids) {
    // ids = select.parcel(params.pkMin, params.pkMax); TODO need to build
  }

  for (const id of ids) {
    const res = await fetchHtml(id);
    const parse = await parser.parseParcel(res)
    console.log(parse)
    // await upsert.parcel(parse); TODO need to build
    return res;
  }
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
