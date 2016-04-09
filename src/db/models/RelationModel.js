/* @flow */

import Sequelize from 'sequelize';

const RelationModel = {
  admin: {
    type: Sequelize.BOOLEAN
  },
  expiretime: {
    type: Sequelize.BIGINT
  },
  interest: {
    type: Sequelize.INTEGER
  },
  item: {
    type: Sequelize.UUID,
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
    type: Sequelize.BIGINT
  },
  resources: {
    type: Sequelize.JSONB
  },
  createtime: {
    type: Sequelize.BIGINT
  },
  updatetime: {
    type: Sequelize.BIGINT
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
};

export default RelationModel;
