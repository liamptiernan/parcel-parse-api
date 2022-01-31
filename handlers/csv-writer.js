function csvBuilder (data) {
    const row = [{}];
    for (const section of data) {
        if (!section.data[0]) {
            const cols = Object.keys(section.data);
            for (const col of cols) {
                row[0][col] = section.data[col];
            }
        } else {
            const cols = Object.keys(section.data[0]);

            for (const subSection of section.data) {
                for (let i=0; i<cols.length; i++) {
                    if (row[0][`${section.id} ${cols[i]}`]) {
                        row[0][`${section.id} ${cols[i]}`] += `${subSection[cols[i]]},`;
                    } else {
                        row[0][`${section.id} ${cols[i]}`] = `${subSection[cols[i]]},`;
                    }
                }
            }
        }
    }
    return row;
}

function buildHeaders(headers) {
    const headerSections = Object.keys(headers);
    let csvHeader = [];
    for (const section of headerSections) {
        headers[section].forEach(header => {
            const headerObject = {
                id: header,
                title: header
            };
            csvHeader.push(headerObject);
        });
    }
    return csvHeader;
}

module.exports = {csvBuilder, buildHeaders};
