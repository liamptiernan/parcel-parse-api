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
    type: DataTypes.INTEGER,
  },
  property_location: DataTypes.STRING,
  township: DataTypes.STRING,
  land_use: DataTypes.STRING,
  property_class: DataTypes.STRING,
  living_units: DataTypes.INTEGER,
  land_area: DataTypes.FLOAT,
  neighborhood_code: DataTypes.STRING,
  zoning: DataTypes.STRING,
  homestead_farmstead_status: DataTypes.STRING,
  legal_desc: DataTypes.STRING,
  owner: DataTypes.STRING,
  mailing_address: DataTypes.STRING,
  utilities: DataTypes.STRING,
  style: DataTypes.STRING,
  year_built: DataTypes.INTEGER,
  year_remodeled: DataTypes.INTEGER,
  stories: DataTypes.FLOAT,
  exterior_walls: DataTypes.STRING,
  attic: DataTypes.STRING,
  fuel_type: DataTypes.STRING,
  heat_system: DataTypes.STRING,
  heat_ac_type: DataTypes.STRING,
  fireplaces: DataTypes.INTEGER,
  total_rooms: DataTypes.INTEGER,
  bedrooms: DataTypes.INTEGER,
  full_baths: DataTypes.INTEGER,
  half_baths: DataTypes.INTEGER,
  basement: DataTypes.STRING,
  basement_garage_spaces: DataTypes.INTEGER,
  finished_basement_area: DataTypes.INTEGER,
  basement_rec_room_area: DataTypes.INTEGER,
  living_area: DataTypes.INTEGER,
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
  tableName: 'monroe_sales',
  indexes: [
    {
      unique: true,
      fields: ['date', 'MonroeParcelId']
    }
  ]
})

const MonroeEntrance = sequelize.define('MonroeEntrance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  inspection_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  inspection_code: DataTypes.STRING,
  info_source_code: DataTypes.STRING
}, {
  tableName: 'monroe_entrance',
  indexes: [
    {
      unique: true,
      fields: ['inspection_date', 'MonroeParcelId']
    }
  ]
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
  tableName: 'monroe_improvements',
  indexes: [
    {
      unique: true,
      fields: ['description', 'area_quantity', 'MonroeParcelId']
    }
  ]
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
