const { MonroeParcel } = require('./models/monroe-models');

async function parcel(record) {
  try {
    const newParcel = await MonroeParcel.upsert(record);
    return newParcel;
  } catch (err) {
    console.log(err)
  }
}

module.exports = { parcel };
