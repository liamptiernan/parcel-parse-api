const { Client } = require('pg');
const fs = require('fs').promises;
// const __dirname = path.resolve();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function getQuery() {
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
    client.connect();

    const query = await getQuery();
    console.log(query);

    const res = await client.query(query);

    // const rows = [];
    // for (let row of res.rows) {
    //   rows.push(row);
    // }
    client.end();
    return res;
  } catch (err) {
    console.log(err)
  }
}

module.exports = { dbTest };
