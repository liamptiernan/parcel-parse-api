const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');
const utils = require('../retired/csv-writer.js');

async function parseParcel (html) {

  // TODO: must return key value pairs for all fields.
  // for those that need a new table, should be separate obj
  /*
   * {monroe_parcels: 
   *  {key: values}, ---- fields and values  
   *  monroe_sales_history:
   *  {key: values},
   *  monroe_entrances:
   *  {key: values},
   *  monroe_utilities:
   *  {key: values},
   *  etc
   * }
   *
   */
  const $ = cheerio.load(html);
  const sections = $('[id] table');

  const data = [];
  for (const section of sections) {
    if (section.attribs.id) {
      const sectionData = await getSectionData(html, section.attribs.id);
      data.push({ id: section.attribs.id, data: sectionData })
    }
  }

  return data;
}

async function parseHeaders(html) {
  const $ = cheerio.load(html);
  const sections = $('[id] table');

  let headers = [];

  for (const section of sections) {
    if (section.attribs.id) {
      const sectionData = await getSectionData(html, section.attribs.id);
      if (Array.isArray(sectionData)) {
        const subKeys = Object.keys(sectionData[0]);
        const dbObjs = subKeys.map(key => {
          return {
            header_name: `${key}-${section.attribs.id}`,
            is_sub_header: true,
            category: section.attribs.id
          }
        })
        headers = headers.concat(dbObjs);
      } else {
        const keys = Object.keys(sectionData);
        const dbObjs = keys.map(key => {
          return {
            header_name: key,
            is_sub_header: false
          }
        })
        headers = headers.concat(dbObjs);
      }
    }
  }

  return headers;
}

/////////////// legacy ///////////////////

async function getSectionCount() {
    const filePath = './html';
    const files = await fs.readdir(filePath);
    let sectionCount = {};

    for (const file of files) {
        const html = await fs.readFile(path.join(filePath, file));
        const $ = cheerio.load(html);
        const sections = $('[id] table');
        
        for (let i=0; i<sections.length; i++) {
            if(sectionCount[sections[i].attribs.id]) {
                sectionCount[sections[i].attribs.id] = ++sectionCount[sections[i].attribs.name];
            } else {
                sectionCount[sections[i].attribs.id] = 1;
            }
        }
    }
}

async function getSectionData(html, sectionName, isHeader) {
  const subSections = ['Sales History', 'Improvements', 'Entrance'];
  const $ = cheerio.load(html);
  const sectionInfo = $(`[id="${sectionName}"] tr`);
  let sectionData = {};
  let headers = [];
  let lastAdded;

  for (let i=0; i<sectionInfo.length; i++) {
    if (sectionInfo[i].children.length > 2 || subSections.includes(sectionName)) {
      if (i == 0) { 
        sectionData = [];
        headers = sectionInfo[i].children.map(child => child.children[0].data);
      } else {
        let rowData = {};
        for (let j=0; j<headers.length; j++) {
          try {
            rowData[headers[j]] = sectionInfo[i].children[j] ? sectionInfo[i].children[j].children[0].data : '';
          } catch(err) {
            // console.log('parse error');
          }
        }
        sectionData.push(rowData);
      }
    } else if (sectionInfo[i].children.length == 2) {
      const key = sectionInfo[i].children[0].children[0] ? sectionInfo[i].children[0].children[0].data : '';
      const value = sectionInfo[i].children[1].children[0] ? sectionInfo[i].children[1].children[0].data : '';
      if (key == String.fromCharCode(160)) {
        sectionData[lastAdded] = sectionData[lastAdded] + sectionInfo[i].children[1].children[0].data;
      } else {
        sectionData[key] = value;
        lastAdded = key;
      }
    }
  }
  if (isHeader) {
    const headers = [];
    const keys = Object.keys(sectionData);
    for (const key of keys) {
      const checkNumber = +key;
      if (isNaN(checkNumber)) {
        headers.push(key);
      } else {
        const subKeys = Object.keys(sectionData[checkNumber]);
        subKeys.forEach(subKey => headers.push(sectionName + ' ' + subKey));
      }
    }
    return headers;
  } else {
    return sectionData;
  }
}

async function getHeaders(files) {
    let headers = {};

    for (const html of files) {
        const $ = cheerio.load(html);
        const sections = $('[id] table');
        
        for (const section of sections) {
          console.log(section)
            if (section.attribs.id) {
                const sectionHeaders = await getSectionData(html, section.attribs.id, true);
                if (!headers[section.attribs.id]) { headers[section.attribs.id] = [];}
                sectionHeaders.forEach(header => {
                    if (!headers[section.attribs.id].includes(header)) {
                        headers[section.attribs.id].push(header);
                    }
                });
            }
        }
    }
    const headerObject = utils.buildHeaders(headers);
    return headers;
}

module.exports = { parseParcel, parseHeaders };
