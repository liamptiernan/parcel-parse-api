const { Sequelize, DataTypes } = require('sequelize');

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

const sequelize = new Sequelize(process.env.DATABASE_URL, config)

const Action = sequelize.define('Action', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ip: DataTypes.STRING,
  sec_ch_ua: DataTypes.STRING,
  sec_ch_ua_mobile: DataTypes.STRING,
  user_agent: DataTypes.STRING,
}, {
  tableName: 'actions'
});

Action.sync({force: true})

module.exports = { Action };
