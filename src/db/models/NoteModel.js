/* @flow */

import Sequelize from 'sequelize';

const NoteModel = {
  count: {
    type: Sequelize.INTEGER
  },
  createtime: {
    type: Sequelize.BIGINT
  },
  data: {
    type: Sequelize.JSONB
  },
  event: {
    type: Sequelize.INTEGER
  },
  group: {
    type: Sequelize.UUID
  },
  score: {
    type: Sequelize.FLOAT
  },
  updatetime: {
    type: Sequelize.BIGINT
  },
  user: {
    type: Sequelize.STRING
  },
};

export default NoteModel;
