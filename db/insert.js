const { MonroeParcel } = require('./models/parcel');
const { MonroeHeader } = require('./models/headers');

async function parcel(records) {
  try {
    const newParcel = await MonroeParcel.bulkCreate(records);
    console.log(`Saved ${records.length} records`);
  } catch (err) {
    console.log(err)
  }
}

async function header(records) {
  let successCount = 0;

  for (const record of records) {
    try {
      const newHeaders = await MonroeHeader.create(record);
      successCount++;
    } catch (err) {
      console.log('no')
    }
  }
  console.log(`Saved ${successCount} records`);
}

module.exports = { parcel, header };
