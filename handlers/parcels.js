const fetch = require('node-fetch');

const insert = require('../db/insert');
const parser = require('./parsers/parcel-parser');
const requests = require('./requests/requests');
// const select = require('../db/select') TODO: build this


async function fetchHtml(searchKey) {
  /*
   * Fetches list of properties using the search key
   */

  const req = requests.parcelRequest(searchKey);
  const res = await fetch(req.url, req.params);

  const text = await res.text();
  return text;
}

async function getIds(params) {
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
    // const parse = parser.parseParsel(res); TODO need to build
    // await upsert.parcel(parse); TODO need to build
  }
}

module.exports = ({ getIds });
