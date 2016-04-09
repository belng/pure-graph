/* @flow */

import Sequelize from 'sequelize';
import EntityModel from './EntityModel';

const ItemModel = {
  ...EntityModel,
  body: {
    type: Sequelize.TEXT
  },
  creator: {
    type: Sequelize.STRING
  },
  parents: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  updater: {
    type: Sequelize.STRING
  }
};

export default ItemModel;
