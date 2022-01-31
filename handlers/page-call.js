const rp = require('request-promise');
const fs = require('fs').promises;
const _ = require('lodash');
const parse = require('csv-parse');
const util = require('util');

const parsePromise = util.promisify(parse);


function readCsv() {
    const csv = fs.readFile('./csv/upset_sale.csv', 'utf-8');
    return csv;
}

function pingUrl(url) {
    try {
        return rp(url);
    } catch (err) {
        console.log(err);
    }
}

async function getHtml(qty) {
    const file = await readCsv();
    const csvData = await parsePromise(file, {columns: false, trim: true});
    const ids = _.flatten(csvData);

    for (let i=0; i<qty; i++) {
        const url = `http://agencies.monroecountypa.gov/monroepa_prod/Datalets/PrintDatalet.aspx?pin=${ids[i]}&gsp=PROFILEALL&taxyear=2021&jur=045&ownseq=0&card=1&roll=REAL&State=1&item=1&items=-1&all=all&ranks=Datalet`;
        try {
            const html = await pingUrl(url);
            fs.writeFile(`./html/${ids[i].replace(/\./gm,'_')}.html`,html);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { getHtml };
