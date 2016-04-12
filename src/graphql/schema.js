/* @flow */
/* eslint-disable no-use-before-define */

import {
  defaultListArgs,
} from 'graphql-sequelize';

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';

import {
  Priv,
  Room,
  Text,
  Thread,
  Topic,
  User,
  Relation,
  RoomRel,
  TextRel,
  ThreadRel,
  TopicRel,
  PrivRel,
} from '../db/db';

import createEntityLoader from '../db/helpers/createEntityLoader';
import childrenResolver from '../db/resolvers/childrenResolver';

import ItemCountsFields from './fields/ItemCountsFields';
import EntityMetaFields from './fields/EntityMetaFields';
import UserParamsFields from './fields/UserParamFields';

import createListType from './helpers/createListType';
import createEntityListType from './helpers/createEntityListType';
import createRelationListType from './helpers/createRealtionListType';
import getAttributeFields from './helpers/getAttributeFields';

const PrivLoader = createEntityLoader(Priv);
const RoomLoader = createEntityLoader(Room);
const TextLoader = createEntityLoader(Text);
const ThreadLoader = createEntityLoader(Thread);
const TopicLoader = createEntityLoader(Topic);
const UserLoader = createEntityLoader(User);

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'Represents a User',
  fields: () => getAttributeFields(User, Object.assign(EntityMetaFields, UserParamsFields, {
    rels: createListType(RelationType, User.Relations),
    roomrels: createListType(RoomRelType, User.RoomRels),
    textrels: createListType(TextRelType, User.TextRels),
    threadrels: createListType(ThreadRelType, User.ThreadRels),
    topicrels: createListType(TopicRelType, User.TopicRels),
    privrels: createListType(PrivRelType, User.PrivRels),
  })),
});

const ItemFields = {
  ...ItemCountsFields,
  ...EntityMetaFields,
  creator: {
    type: UserType,
    resolve(item) {
      return UserLoader.load(item.creator);
    },
  },
  updater: {
    type: UserType,
    resolve(item) {
      return UserLoader.load(item.updater);
    },
  },
};

const RelationFields = {
  user: {
    type: UserType,
    resolve(item) {
      return UserLoader.load(item.user);
    },
  },
};

function getItemFields(Model: Object, fields?: Object) {
  return getAttributeFields(Model, Object.assign(ItemFields, fields));
}

function getRelationFields(Model: Object, fields?: Object) {
  return getAttributeFields(Model, Object.assign(RelationFields, fields));
}

const PrivType = new GraphQLObjectType({
  name: 'PrivType',
  description: 'Represents a private chat',
  fields: () => getItemFields(Priv, {
    rels: createListType(PrivRelType, Priv.PrivRels),
  }),
});

const RoomType = new GraphQLObjectType({
  name: 'RoomType',
  description: 'Represents a Room',
  fields: () => getItemFields(Room, {
    rels: createListType(RoomRelType, Room.RoomRels),
    threads: {
      type: new GraphQLList(ThreadType),
      args: defaultListArgs(),
      resolve: childrenResolver(Thread),
    },
    texts: {
      type: new GraphQLList(TextType),
      args: defaultListArgs(),
      resolve: childrenResolver(Text),
    },
  }),
});

const TextType = new GraphQLObjectType({
  name: 'TextType',
  description: 'Represents a Text',
  fields: () => getItemFields(Text, {
    rels: createListType(TextRelType, Text.TextRels),
  }),
});

const ThreadType = new GraphQLObjectType({
  name: 'ThreadType',
  description: 'Represents a Thread',
  fields: () => getItemFields(Thread, {
    rels: createListType(ThreadRelType, Thread.ThreadRels),
    texts: {
      type: new GraphQLList(TextType),
      args: defaultListArgs(),
      resolve: childrenResolver(Text),
    },
  }),
});

const TopicType = new GraphQLObjectType({
  name: 'TopicType',
  description: 'Represents a Topic',
  fields: () => getItemFields(Topic, {
    rel: createListType(TopicRelType, Topic.TopicRels),
  }),
});

const RelationType = new GraphQLObjectType({
  name: 'RelationType',
  description: 'Represents a Relation',
  fields: () => getRelationFields(Relation),
});

const RoomRelType = new GraphQLObjectType({
  name: 'RoomRelType',
  description: 'Represents a Relation with a Room',
  fields: () => getRelationFields(RoomRel, {
    room: {
      type: RoomType,
      resolve(rel) {
        return RoomLoader.load(rel.item);
      },
    },
  }),
});

const TextRelType = new GraphQLObjectType({
  name: 'TextRelType',
  description: 'Represents a Relation with a Text',
  fields: () => getRelationFields(TextRel, {
    text: {
      type: TextType,
      resolve(rel) {
        return TextLoader.load(rel.item);
      },
    },
  }),
});

const ThreadRelType = new GraphQLObjectType({
  name: 'ThreadRelType',
  description: 'Represents a Relation with a Thread',
  fields: () => getRelationFields(ThreadRel, {
    thread: {
      type: ThreadType,
      resolve(rel) {
        return ThreadLoader.load(rel.item);
      },
    },
  }),
});

const TopicRelType = new GraphQLObjectType({
  name: 'TopicRelType',
  description: 'Represents a Relation with a Topic',
  fields: () => getRelationFields(TopicRel, {
    topic: {
      type: TopicType,
      resolve(rel) {
        return TopicLoader.load(rel.item);
      },
    },
  }),
});

const PrivRelType = new GraphQLObjectType({
  name: 'PrivRelType',
  description: 'Represents a Relation',
  fields: () => getRelationFields(PrivRel, {
    priv: {
      type: PrivType,
      resolve(rel) {
        return PrivLoader.load(rel.item);
      },
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root query object',
  fields: () => {
    return {
      privs: createEntityListType(PrivType, Priv),
      rooms: createEntityListType(RoomType, Room),
      texts: createEntityListType(TextType, Text),
      threads: createEntityListType(ThreadType, Thread),
      topics: createEntityListType(TopicType, Topic),
      users: createEntityListType(UserType, User),
      rels: createRelationListType(RelationType, Relation),
      roomrels: createRelationListType(RoomRelType, RoomRel),
      textrels: createRelationListType(TextRelType, TextRel),
      threadrels: createRelationListType(ThreadRelType, ThreadRel),
      topicrels: createRelationListType(TopicRelType, TopicRel),
      privrels: createRelationListType(PrivRelType, PrivRel),
    };
  },
});

const Schema = new GraphQLSchema({
  query: QueryType,
});

export default Schema;
