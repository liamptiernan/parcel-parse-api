const { 
  MonroeParcel,
  MonroeEntrance,
  MonroeImprovement,
  MonroeSale,
  MonroeList
} = require('./models/monroe-models');

async function parcel(options, params = {}) {
  try {
    console.log('fetching');

    if (params.include) {
      options.include = [
        MonroeEntrance,
        MonroeImprovement,
        MonroeSale
      ];
    }

    const parcels = await MonroeParcel.findAll(options);
    console.log(`Found ${parcels.length} records`);
    return parcels;
  } catch (err) {
    console.log(err);
    return {queryError: true}
  }
}

async function list(options, params = {}) {
  try {
    let parcels;

    if (params.method === 'findOne') {
      parcels = await MonroeList.findOne(options);
    } else {
      parcels = await MonroeList.findAll(options);
    }

    return parcels
  } catch (err) {
    console.log(err);
    return {queryError: true}
  }
}

module.exports = { list, parcel };
