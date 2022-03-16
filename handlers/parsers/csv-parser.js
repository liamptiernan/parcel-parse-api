const fs = require('fs').promises;
const _ = require('lodash');
const parse = require('csv-parse');
const util = require('util');

const parsePromise = util.promisify(parse);

async function readCsv() {
  const csv = await fs.readFile('../../csv/new sheriff.csv', 'utf-8');

  const csvData = await parsePromise(csv, {columns: false, trim: true});
  const ids = _.flatten(csvData);
  fs.writeFile('./test.json',JSON.stringify(ids))
  console.log(ids);
}

readCsv();
