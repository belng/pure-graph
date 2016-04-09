/* @flow */

import Sequelize from 'sequelize';
import PrivModel from './models/PrivModel';
import RoomModel from './models/RoomModel';
import TextModel from './models/TextModel';
import ThreadModel from './models/ThreadModel';
import TopicModel from './models/TopicModel';
import UserModel from './models/UserModel';
import RelationModel from './models/RelationModel';
import config from '../../config.json';

const { postgres } = config;

const db = new Sequelize(
  postgres.db,
  postgres.user,
  postgres.password,
  {
    dialect: 'postgres',
    host: postgres.host
  }
);

const fieldMaps = {
  createdAt: 'createtime',
  updatedAt: 'updatetime',
  deletedAt: 'deleteTime',
};

export const Priv = db.define('priv', PrivModel, fieldMaps);
export const Room = db.define('room', RoomModel, fieldMaps);
export const Text = db.define('text', TextModel, fieldMaps);
export const Thread = db.define('thread', ThreadModel, fieldMaps);
export const Topic = db.define('topic', TopicModel, fieldMaps);
export const User = db.define('user', UserModel, fieldMaps);
export const Relation = db.define('rel', RelationModel, fieldMaps);
export const RoomRel = db.define('roomrel', RelationModel, fieldMaps);
export const TextRel = db.define('textrel', RelationModel, fieldMaps);
export const ThreadRel = db.define('threadrel', RelationModel, fieldMaps);
export const TopicRel = db.define('topicrel', RelationModel, fieldMaps);
export const PrivRel = db.define('privrel', RelationModel, fieldMaps);

User.Relations = User.hasMany(Relation, { foreignKey: 'user' });
User.RoomRels = User.hasMany(RoomRel, { foreignKey: 'user' });
User.TextRels = User.hasMany(TextRel, { foreignKey: 'user' });
User.ThreadRels = User.hasMany(ThreadRel, { foreignKey: 'user' });
User.TopicRels = User.hasMany(TopicRel, { foreignKey: 'user' });
User.PrivRels = User.hasMany(PrivRel, { foreignKey: 'user' });

Room.RoomRels = Room.hasMany(RoomRel, { foreignKey: 'item' });
Text.TextRels = Text.hasMany(TextRel, { foreignKey: 'item' });
Thread.ThreadRels = Thread.hasMany(ThreadRel, { foreignKey: 'item' });
Topic.TopicRels = Topic.hasMany(TopicRel, { foreignKey: 'item' });
Priv.PrivRels = Priv.hasMany(PrivRel, { foreignKey: 'item' });

RoomRel.Room = RoomRel.belongsTo(Room, { foreignKey: 'item' });
TextRel.Text = TextRel.belongsTo(Text, { foreignKey: 'item' });
ThreadRel.Thread = ThreadRel.belongsTo(Thread, { foreignKey: 'item' });
TopicRel.Topic = TopicRel.belongsTo(Topic, { foreignKey: 'item' });
PrivRel.Priv = PrivRel.belongsTo(Priv, { foreignKey: 'item' });

Room.User = Room.belongsTo(User, { foreignKey: 'creator' });
Text.User = Text.belongsTo(User, { foreignKey: 'creator' });
Thread.User = Thread.belongsTo(User, { foreignKey: 'creator' });
Topic.User = Topic.belongsTo(User, { foreignKey: 'creator' });
Priv.User = Priv.belongsTo(User, { foreignKey: 'creator' });

export default db;
