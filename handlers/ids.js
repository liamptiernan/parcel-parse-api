const fetch = require('node-fetch');

const parser = require('./parsers/id-parse');
const requests = require('./requests/requests');


async function fetchHtml(searchKey) {
  /*
   * Fetches list of properties using the search key
   */

  const req = requests.idRequest(searchKey);
  console.log(searchKey)
  const res = await fetch(req.url, req.params);
  const text = await res.text();
  return text;
}

async function getIds(idRange={min:0,max:9}) {
  /*
   * Makes calls to monroe county webpage.
   * Uses search tree / queue to determine when to search deeper
   * 
   */

  const arrayGen = function* (min, max) {
    let i = min;
    while (i<=max) {
      yield i.toString();
      i++;
    }
  }

  let nodes = [...arrayGen(idRange.min, idRange.max)];

  while (nodes.length > 0) {
    let searchKey = nodes.shift();
    const res = await fetchHtml(searchKey);
    const parse = parser.parseIds(res);

    if (parse.isMax) {
      const baseArr = [...arrayGen(0,9)];
      const childNodes = baseArr.map(value => {
        return searchKey + value;
      });
      nodes = nodes.concat(childNodes);
    } else {
      console.log(parse);
    }
  }
}

module.exports = ({ getIds });
