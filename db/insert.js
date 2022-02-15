const { 
  MonroeParcel,
  MonroeHeader,
  MonroeSale,
  MonroeEntrance,
  MonroeImprovement
} = require('./models/monroe-models');

function filterErrors(err) {
  let errors = err;
  if (err.errors) {
    errors = err.errors.filter(error => {
      const acceptErrors = ['not_unique', 'is_null'];
      return !acceptErrors.includes(error.validatorKey);
    })
  }

  return errors;
}

async function parcel(records) {
  try {
    const newParcel = await MonroeParcel.bulkCreate(records);
    console.log(`Saved ${records.length} records`);
  } catch (err) {
    const errors = filterErrors(err);
    if (errors.length > 0) {console.log(errors)}
  }
}

async function sale(records) {
  for (const record of records) {
    try {
      const newSale = await MonroeSale.create(record);
    } catch (err) {
      const errors = filterErrors(err);
      if (errors.length > 0) {console.log(errors)}
    }
  }
}

async function entrance(records) {
  for (const record of records) {
    try {
      const newSale = await MonroeEntrance.create(record);
    } catch (err) {
      const errors = filterErrors(err);
      if (errors.length > 0) {console.log(errors)}
    }
  }
}

async function improvement(records) {
  await MonroeImprovement.sync();
  for (const record of records) {
    try {
      const newSale = await MonroeImprovement.create(record);
    } catch (err) {
      console.log(err);
      // const errors = filterErrors(err);
      // if (errors.length > 0) {console.log(errors)}
    }
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

module.exports = { entrance, improvement, parcel, header, sale };
