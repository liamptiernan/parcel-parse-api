const { MonroeParcel, MonroeHeader } = require('./models/monroe-models');

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
  // await MonroeHeader.sync({ force: true });
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
