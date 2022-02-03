const { Sequelize } = require('sequelize');

const config = {
  logging: false,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

async function connect() {
  try {
    const client = await new Sequelize(process.env.DATABASE_URL, config)
    // await client.authenticate();
    // console.log('Connection has been established successfully.');
    return client;
  } catch (err) {
    console.log(err)
  }
}

module.exports = { connect };
