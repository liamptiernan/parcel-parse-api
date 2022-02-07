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

const MonroeHeader = sequelize.define('MonroeHeader', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  header_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  is_sub_header: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  category: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'monroe_headers'
})

module.exports = { MonroeHeader, sequelize };
