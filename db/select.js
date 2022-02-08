const { MonroeParcel } = require('./models/parcel');

async function parcel(options) {
  try {
    console.log('fetching')
    const parcels = await MonroeParcel.findAll(options);
    console.log(`Found ${parcels.length} records`);
    return parcels;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { parcel };
