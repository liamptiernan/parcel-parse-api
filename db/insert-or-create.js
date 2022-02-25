const { MonroeList } = require('./models/monroe-models');

async function list(record) {
  try {
    const newList = await MonroeList.findOrCreate(record);
    console.log(`Created Record`);
    return newList;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { list };
