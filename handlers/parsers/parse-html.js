const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');
const utils = require('../csv-writer.js');

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
    const $ = cheerio.load(html);
    const sectionInfo = $(`[id="${sectionName}"] tr`);
    let sectionData = {};
    let headers = [];
    let lastAdded;

    for (let i=0; i<sectionInfo.length; i++) {
        if (sectionInfo[i].children.length == 2) {
            const key = sectionInfo[i].children[0].children[0] ? sectionInfo[i].children[0].children[0].data : '';
            const value = sectionInfo[i].children[1].children[0] ? sectionInfo[i].children[1].children[0].data : '';
            if (key == String.fromCharCode(160)) {
                sectionData[lastAdded] = sectionData[lastAdded] + sectionInfo[i].children[1].children[0].data;
            } else {
                sectionData[key] = value;
                lastAdded = key;
            }
        } else if (sectionInfo[i].children.length > 2) {
            if (i == 0) { 
                sectionData = [];
                headers = sectionInfo[i].children.map(child => child.children[0].data);
            } else {
                let rowData = {};
                for (let j=0; j<headers.length; j++) {
                    try {
                        rowData[headers[j]] = sectionInfo[i].children[j] ? sectionInfo[i].children[j].children[0].data : '';
                    } catch(err) {
                        console.log(err);
                    }
                }
                sectionData.push(rowData);
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

async function getHeaders() {
    const filePath = './html';
    const files = await fs.readdir(filePath);

    let headers = {};

    for (const file of files) {
        const html = await fs.readFile(path.join(filePath, file));
        const $ = cheerio.load(html);
        const sections = $('[id] table');
        
        for (const section of sections) {
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
    return headerObject;
}

module.exports = {getHeaders, getSectionCount, getSectionData};
