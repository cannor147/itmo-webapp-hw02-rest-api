import { Sequelize } from 'sequelize';

import Locations from '../models/locations';

const sequelize = new Sequelize('itmo', 'admin', 'admin', {
  host: 'postgres',
  port: 5432,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

Locations.init(Locations.attributes, {
  sequelize,
  modelName: 'locations'
});

const db = {
  sequelize
};

export default db;
