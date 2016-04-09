/* @flow */

import Sequelize from 'sequelize';
import ItemModel from './ItemModel';

const RoomModel = {
  ...ItemModel,
  identities: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
};

export default RoomModel;
