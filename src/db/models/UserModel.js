/* @flow */

import Sequelize from 'sequelize';
import EntityModel from './EntityModel';

const UserModel = {
  ...EntityModel,
  identities: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  locale: {
    type: Sequelize.INTEGER
  },
  presence: {
    type: Sequelize.INTEGER
  },
  presencetime: {
    type: Sequelize.DATE
  },
  resources: {
    type: Sequelize.JSONB
  },
  timezone: {
    type: Sequelize.INTEGER
  }
};

export default UserModel;
