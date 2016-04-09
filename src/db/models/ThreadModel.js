/* @flow */

import Sequelize from 'sequelize';
import ItemModel from './ItemModel';

const ThreadModel = {
  ...ItemModel,
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
};

export default ThreadModel;
