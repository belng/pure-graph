/* @flow */

import Sequelize from 'sequelize';

const EntityModel = {
  counts: {
    type: Sequelize.JSONB
  },
  createtime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  deletetime: {
    type: Sequelize.DATE
  },
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  meta: {
    type: Sequelize.JSONB
  },
  name: {
    type: Sequelize.STRING,
  },
  params: {
    type: Sequelize.JSONB
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  updatetime: {
    type: Sequelize.DATE,
  },
};

export default EntityModel;
