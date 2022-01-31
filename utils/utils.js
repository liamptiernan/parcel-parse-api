const rp = require('request-promise');
const _ = require('lodash');
const parse = require('csv-parse');
const util = require('util');

const parsePromise = util.promisify(parse);

function pingUrl(url) {
  try {
      return rp(url);
  } catch (err) {
      console.log(err);
  }
}

module.exports = { pingUrl };
