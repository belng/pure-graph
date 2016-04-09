/* @flow */

import Sequelize from 'sequelize';

const EntityModel = {
  counts: {
    type: Sequelize.JSONB
  },
  createtime: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  deletetime: {
    type: Sequelize.BIGINT
  },
  id: {
    type: Sequelize.UUID,
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
    type: Sequelize.BIGINT,
  },
};

export default EntityModel;
