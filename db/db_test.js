const fs = require('fs').promises;
const { MonroeParcel, sequelize } = require('./models/parcel');

async function getQuery(fields, values) {
  try {
    const file = await fs.readFile(__dirname + '/queries/insert_test.sql');
    const text = file.toString();
    return text;
  } catch (err) {
    throw new Error(err);
  }
}

async function dbTest() {
  try {
    // await sequelize.sync({ force: true })
    const secondParcel = MonroeParcel.build({ parcel_id: '1.1.1' });
    await secondParcel.save();
    console.log('we saved!')
  } catch (err) {
    console.log(err)
  }
}

module.exports = { dbTest };
