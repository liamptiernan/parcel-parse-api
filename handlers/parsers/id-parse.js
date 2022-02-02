const fs = require('fs').promises;
const cheerio = require('cheerio');

function checkIsMax($) {
  /*
   * Checks if page has returned a complete dataset
   * or if the 3000 record limit was hit
   */

  const select = $("b:contains('You will not be able to select all records')");
  const isMax = select[0];

  if (isMax) return true;

  return false;
}

function listIds($) {
  const select = $(".SearchResults");
  
  const ids = [];
  select.each(function (index) {
    const fields = $(this).find('td');
    ids.push(fields[0].children[0].children[0].data);
  })

  return ids;
}

function parseIds(html) {
  const $ = cheerio.load(html);
  
  const isMax = checkIsMax($);
  if (isMax) return { isMax };

  const ids = listIds($);
  return ids;
}

fs.readFile('../../list_html/testfile.html').then(res => {
  console.log(res)
});

module.exports = { parseIds };
