const { Op } = require('sequelize');

const findOrCreate = require('../db/insert-or-create');
const select = require('../db/select');
const {
  MonroeEntrance,
  MonroeImprovement,
  MonroeSale
} = require('../db/models/monroe-models');

async function updateList(params) {
  // find or create the list
  // for each parcel ID, get the parcel and add the list (.addMonroeLists(List))
  try {
    const listParams = {
      where: {
        title: params.listName
      }
    }

    const list = await findOrCreate.list(listParams);

    const parcels = await select.parcel({
      attributes: [
        'id'
      ],
      where: {
        parcel_id: {
          [Op.eq]: {
            [Op.any]: params.parcelIds
          }
        }
      }
    });

    await list[0].addMonroeParcels(parcels);

    return {
      newListCreated: list[1],
      listName: list[0].title,
      parcels: parcels.length
    };
  } catch (err) {
    console.error(err);
    return {error: true}
  }
}

async function getListParcels(params) {
  /*
   * Gets list parcel IDs and returns paginated parcel data
   */

  const listOptions = {
    where: {
      title: params.listName
    }
  }

  try {
    const listRecord = await select.list(listOptions, { method: 'findOne' });

    let pageSize = params.pageSize ? Number(params.pageSize) : 100;
    const offset = params.offset ? Number(params.offset) : 0;

    if (params.pageSize > 500) {
      pageSize = 500;
    }

    const parcelOptions = {
      limit: pageSize,
      offset,
      order: [['parcel_id', 'ASC']],
      include: [
        MonroeEntrance,
        MonroeImprovement,
        MonroeSale
      ]
    }

    const parcels = await listRecord.getMonroeParcels(parcelOptions);
    return parcels;
  } catch (err) {
    console.error(err);
    return {error: true}
  }
}

module.exports = { getListParcels, updateList }
