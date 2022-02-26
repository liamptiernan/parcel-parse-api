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
    if (params.method === 'findOne') {
      return await MonroeList.findOne(options);
    } else {
      return await MonroeList.findAll(options);
    }
  } catch (err) {
    console.log(err);
    return {queryError: true}
  }
}

module.exports = { list, parcel };
