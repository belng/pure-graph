/* @flow */
/* eslint-disable no-use-before-define */

import {
  attributeFields,
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

const fieldOptions = {
  exclude: [
    'counts',
    'meta',
    'params',
    'resources',
  ],
};

const PrivLoader = createEntityLoader(Priv);
const RoomLoader = createEntityLoader(Room);
const TextLoader = createEntityLoader(Text);
const ThreadLoader = createEntityLoader(Thread);
const TopicLoader = createEntityLoader(Topic);
const UserLoader = createEntityLoader(User);

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'Represents a User',
  fields: () => Object.assign(attributeFields(User, fieldOptions), EntityMetaFields, UserParamsFields, {
    rels: createListType(RelationType, User.Relations),
    roomrels: createListType(RoomRelType, User.RoomRels),
    textrels: createListType(TextRelType, User.TextRels),
    threadrels: createListType(ThreadRelType, User.ThreadRels),
    topicrels: createListType(TopicRelType, User.TopicRels),
    privrels: createListType(PrivRelType, User.PrivRels),
  }),
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

const PrivType = new GraphQLObjectType({
  name: 'PrivType',
  description: 'Represents a private chat',
  fields: () => Object.assign(attributeFields(Priv, fieldOptions), ItemFields, {
    rels: createListType(PrivRelType, Priv.PrivRels),
  }),
});

const RoomType = new GraphQLObjectType({
  name: 'RoomType',
  description: 'Represents a Room',
  fields: () => Object.assign(attributeFields(Room, fieldOptions), ItemFields, {
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
  fields: () => Object.assign(attributeFields(Text, fieldOptions), ItemFields, {
    rels: createListType(TextRelType, Text.TextRels),
  }),
});

const ThreadType = new GraphQLObjectType({
  name: 'ThreadType',
  description: 'Represents a Thread',
  fields: () => Object.assign(attributeFields(Thread, fieldOptions), ItemFields, {
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
  fields: () => Object.assign(attributeFields(Topic, fieldOptions), ItemFields, {
    rel: createListType(TopicRelType, Topic.TopicRels),
  }),
});

const RelationType = new GraphQLObjectType({
  name: 'RelationType',
  description: 'Represents a Relation',
  fields: () => Object.assign(attributeFields(Relation, fieldOptions), RelationFields),
});

const RoomRelType = new GraphQLObjectType({
  name: 'RoomRelType',
  description: 'Represents a Relation with a Room',
  fields: () => Object.assign(attributeFields(RoomRel, fieldOptions), RelationFields, {
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
  fields: () => Object.assign(attributeFields(TextRel, fieldOptions), RelationFields, {
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
  fields: () => Object.assign(attributeFields(ThreadRel, fieldOptions), RelationFields, {
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
  fields: () => Object.assign(attributeFields(TopicRel, fieldOptions), RelationFields, {
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
  fields: () => Object.assign(attributeFields(PrivRel, fieldOptions), RelationFields, {
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
