const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');
const csvWrite = require('csv-writer').createObjectCsvWriter;
const utils = require('./csv-writer.js');

const htmlParser = require('./parsers/parse-html.js');

async function getData(req) {
    const filePath = './html';
    const files = await fs.readdir(filePath);

    const headers = await htmlParser.getHeaders();
    const newPath = `./csv/export.csv`
    const csvWriter = csvWrite({
        path: newPath,
        header: headers
    });

    for (const file of files) {
        const html = await fs.readFile(path.join(filePath, file));
        const $ = cheerio.load(html);
        const sections = $('[id] table');

        const data = [];
        
        for (const section of sections) {
            if (section.attribs.id) {
                const sectionData = await htmlParser.getSectionData(html, section.attribs.id);
                data.push({id: section.attribs.id, data: sectionData});
            }
        }
        const csvData = utils.csvBuilder(data);
        try {
            await csvWriter.writeRecords(csvData);
        } catch (err) {
            console.log(err);
        }
    }
  return newPath;
}

module.exports = { getData };
