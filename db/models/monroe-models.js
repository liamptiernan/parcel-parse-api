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

const MonroeParcel = sequelize.define('MonroeParcel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  parcel_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  map_number: {
    type: DataTypes.STRING,
  },
  property_location: DataTypes.STRING,
  township: DataTypes.STRING,
  land_use: DataTypes.STRING,
  property_class: DataTypes.STRING,
  living_units: DataTypes.STRING,
  land_area: DataTypes.STRING,
  neighborhood_code: DataTypes.STRING,
  zoning: DataTypes.STRING,
  homestead_farmstead_status: DataTypes.STRING,
  legal_desc: DataTypes.STRING,
  owner: DataTypes.STRING,
  mailing_address: DataTypes.STRING,
  utilities: DataTypes.STRING,
  style: DataTypes.STRING,
  year_built: DataTypes.STRING,
  year_remodeled: DataTypes.STRING,
  stories: DataTypes.STRING,
  exterior_walls: DataTypes.STRING,
  attic: DataTypes.STRING,
  fuel_type: DataTypes.STRING,
  heat_system: DataTypes.STRING,
  heat_ac_type: DataTypes.STRING,
  fireplaces: DataTypes.STRING,
  total_rooms: DataTypes.STRING,
  bedrooms: DataTypes.STRING,
  full_baths: DataTypes.STRING,
  half_baths: DataTypes.STRING,
  basement: DataTypes.STRING,
  basement_garage_spaces: DataTypes.STRING,
  finished_basement_area: DataTypes.STRING,
  basement_rec_room_area: DataTypes.STRING,
  living_area: DataTypes.STRING,
  amenity_1: DataTypes.STRING,
  quantity: DataTypes.STRING,
  amenity_2: DataTypes.STRING,
  amenity_3: DataTypes.STRING,
  amenity_4: DataTypes.STRING
}, {
  tableName: 'monroe_parcels'
})

const MonroeSale = sequelize.define('MonroeSale', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: DataTypes.DATEONLY,
  amount: DataTypes.INTEGER,
  book: DataTypes.INTEGER,
  page: DataTypes.INTEGER,
  grantor: DataTypes.STRING,
  grantee: DataTypes.STRING
}, {
  tableName: 'monroe_sales'
})

const MonroeEntrance = sequelize.define('MonroeEntrance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  inspection_date: DataTypes.DATEONLY,
  inspection_code: DataTypes.STRING,
  info_source_code: DataTypes.STRING
}, {
  tableName: 'monroe_entrance'
})

const MonroeImprovement = sequelize.define('MonroeImprovement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  area_quantity: DataTypes.INTEGER
}, {
  tableName: 'monroe_improvements'
})

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
});

MonroeParcel.hasMany(MonroeSale);
MonroeParcel.hasMany(MonroeEntrance);
MonroeParcel.hasMany(MonroeImprovement);

MonroeSale.belongsTo(MonroeParcel);
MonroeEntrance.belongsTo(MonroeParcel);
MonroeImprovement.belongsTo(MonroeParcel);

module.exports = { MonroeParcel, MonroeHeader, MonroeSale, MonroeEntrance, MonroeImprovement };
