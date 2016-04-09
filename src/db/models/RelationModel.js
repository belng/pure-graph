/* @flow */

import Sequelize from 'sequelize';

const RelationModel = {
  admin: {
    type: Sequelize.BOOLEAN
  },
  expiretime: {
    type: Sequelize.DATE
  },
  interest: {
    type: Sequelize.INTEGER
  },
  item: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: Sequelize.STRING
  },
  presence: {
    type: Sequelize.INTEGER,
  },
  presencetime: {
    type: Sequelize.DATE
  },
  resources: {
    type: Sequelize.JSONB
  },
  createtime: {
    type: Sequelize.DATE
  },
  updatetime: {
    type: Sequelize.DATE
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
};

export default RelationModel;
