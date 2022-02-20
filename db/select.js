const { 
  MonroeParcel,
  MonroeEntrance,
  MonroeImprovement,
  MonroeSale
} = require('./models/monroe-models');

async function parcel(options) {
  try {
    console.log('fetching')
    options.include = [
      MonroeEntrance,
      MonroeImprovement,
      MonroeSale
    ];

    const parcels = await MonroeParcel.findAll(options);
    console.log(`Found ${parcels.length} records`);
    return parcels;
  } catch (err) {
    console.log(err);
    return {queryError: true}
  }
}

module.exports = { parcel };
