const fs = require('fs').promises;
const { MonroeParcel } = require('./models/parcel');

async function parcel(records) {
  try {
    const newParcel = await MonroeParcel.bulkCreate(records);
    console.log(`Saved ${records.length} records`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = { parcel };
