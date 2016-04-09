/* @flow */
/* eslint-disable no-use-before-define */

import {
  resolver,
  attributeFields,
  defaultListArgs
} from 'graphql-sequelize';

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import db, {
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
import ItemCountsFields from './fields/ItemCountsFields';
import EntityMetaFields from './fields/EntityMetaFields';
import UserParamsFields from './fields/UserParamFields';

const fieldOptions = {
  exclude: [ 'counts', 'meta', 'params', 'resources' ]
};

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => Object.assign(attributeFields(User, fieldOptions), EntityMetaFields, UserParamsFields, {
    rels: {
      type: new GraphQLList(RelationType),
      args: defaultListArgs(),
      resolve: resolver(User.Relations)
    },
    roomrels: {
      type: new GraphQLList(RoomRelType),
      args: defaultListArgs(),
      resolve: resolver(User.RoomRels)
    },
    textrels: {
      type: new GraphQLList(TextRelType),
      args: defaultListArgs(),
      resolve: resolver(User.TextRels)
    },
    threadrels: {
      type: new GraphQLList(ThreadRelType),
      args: defaultListArgs(),
      resolve: resolver(User.ThreadRels)
    },
    topicrels: {
      type: new GraphQLList(TopicRelType),
      args: defaultListArgs(),
      resolve: resolver(User.TopicRels)
    },
    privrels: {
      type: new GraphQLList(PrivRelType),
      args: defaultListArgs(),
      resolve: resolver(User.PrivRels)
    },
  })
});

const ItemFields = {
  ...ItemCountsFields,
  ...EntityMetaFields,
  creator: {
    type: UserType,
    resolve(item) {
      return item.getUser();
    }
  },
  updater: {
    type: UserType,
    resolve(item) {
      return db.models.user.findOne({ where: { id: item.updater } });
    }
  }
};

const RelationFields = {
  user: {
    type: UserType,
    resolve(rel) {
      return db.models.user.findOne({ where: { id: rel.user } });
    }
  }
};

const PrivType = new GraphQLObjectType({
  name: 'Priv',
  description: 'Represents a private chat',
  fields: () => Object.assign(attributeFields(Priv, fieldOptions), ItemFields, {
    rels: {
      type: new GraphQLList(PrivRelType),
      args: defaultListArgs(),
      resolve: resolver(Priv.PrivRels)
    }
  })
});

const RoomType = new GraphQLObjectType({
  name: 'Room',
  description: 'Represents a Room',
  fields: () => Object.assign(attributeFields(Room, fieldOptions), ItemFields, {
    rels: {
      type: new GraphQLList(RoomRelType),
      args: defaultListArgs(),
      resolve: resolver(Room.RoomRels)
    },
    threads: {
      type: new GraphQLList(ThreadType),
      args: defaultListArgs(),
      resolve(entity, args) {
        return db.models.thread.findAll({
          limit: args.limit,
          order: args.order,
          where: { parents: { $contains: [ entity.id ] }, ...args.where },
        });
      }
    },
    texts: {
      type: new GraphQLList(TextType),
      args: defaultListArgs(),
      resolve(entity, args) {
        return db.models.text.findAll({
          limit: args.limit,
          order: args.order,
          where: { parents: { $contains: [ entity.id ] }, ...args.where },
        });
      }
    },
  })
});

const TextType = new GraphQLObjectType({
  name: 'Text',
  description: 'Represents a Text',
  fields: () => Object.assign(attributeFields(Text, fieldOptions), ItemFields, {
    rels: {
      type: new GraphQLList(TextRelType),
      args: defaultListArgs(),
      resolve: resolver(Text.TextRels)
    }
  })
});

const ThreadType = new GraphQLObjectType({
  name: 'Thread',
  description: 'Represents a Thread',
  fields: () => Object.assign(attributeFields(Thread, fieldOptions), ItemFields, {
    rels: {
      type: new GraphQLList(ThreadRelType),
      args: defaultListArgs(),
      resolve: resolver(Thread.ThreadRels)
    },
    texts: {
      type: new GraphQLList(TextType),
      args: defaultListArgs(),
      resolve(entity, args) {
        return db.models.text.findAll({
          limit: args.limit,
          order: args.order,
          where: { parents: { $contains: [ entity.id ] }, ...args.where },
        });
      }
    },
  })
});

const TopicType = new GraphQLObjectType({
  name: 'Topic',
  description: 'Represents a Topic',
  fields: () => Object.assign(attributeFields(Topic, fieldOptions), ItemFields, {
    rel: {
      type: new GraphQLList(TopicRelType),
      args: defaultListArgs(),
      resolve: resolver(Topic.TopicRels)
    }
  })
});

const RelationType = new GraphQLObjectType({
  name: 'Relation',
  description: 'This represents a Relation',
  fields: () => Object.assign(attributeFields(Relation, fieldOptions), RelationFields)
});

const RoomRelType = new GraphQLObjectType({
  name: 'RoomRel',
  description: 'This represents a Relation',
  fields: () => Object.assign(attributeFields(RoomRel, fieldOptions), RelationFields, {
    room: {
      type: RoomType,
      resolve(rel) {
        return rel.getRoom();
      }
    },
  })
});

const TextRelType = new GraphQLObjectType({
  name: 'TextRel',
  description: 'This represents a Relation',
  fields: () => Object.assign(attributeFields(TextRel, fieldOptions), RelationFields, {
    text: {
      type: TextType,
      resolve(rel) {
        return rel.getText();
      }
    },
  })
});

const ThreadRelType = new GraphQLObjectType({
  name: 'ThreadRel',
  description: 'This represents a Relation',
  fields: () => Object.assign(attributeFields(ThreadRel, fieldOptions), RelationFields, {
    thread: {
      type: ThreadType,
      resolve(rel) {
        return rel.getThread();
      }
    },
  })
});

const TopicRelType = new GraphQLObjectType({
  name: 'TopicRel',
  description: 'This represents a Relation',
  fields: () => Object.assign(attributeFields(TopicRel, fieldOptions), RelationFields, {
    topic: {
      type: TopicType,
      resolve(rel) {
        return rel.getTopic();
      }
    },
  })
});

const PrivRelType = new GraphQLObjectType({
  name: 'PrivRel',
  description: 'This represents a Relation',
  fields: () => Object.assign(attributeFields(PrivRel, fieldOptions), RelationFields, {
    priv: {
      type: PrivType,
      resolve(rel) {
        return rel.getPriv();
      }
    },
  })
});

const EntityArgs = Object.assign(defaultListArgs(), {
  id: {
    type: GraphQLString
  }
});

const RelationArgs = Object.assign(defaultListArgs(), {
  user: {
    type: GraphQLString
  },
  item: {
    type: GraphQLString
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      privs: {
        type: new GraphQLList(PrivType),
        args: EntityArgs,
        resolve: resolver(Priv),
      },
      rooms: {
        type: new GraphQLList(RoomType),
        args: EntityArgs,
        resolve: resolver(Room),
      },
      texts: {
        type: new GraphQLList(TextType),
        args: EntityArgs,
        resolve: resolver(Text),
      },
      threads: {
        type: new GraphQLList(ThreadType),
        args: EntityArgs,
        resolve: resolver(Thread),
      },
      topics: {
        type: new GraphQLList(TopicType),
        args: EntityArgs,
        resolve: resolver(Topic),
      },
      users: {
        type: new GraphQLList(UserType),
        args: EntityArgs,
        resolve: resolver(User),
      },
      rels: {
        type: new GraphQLList(RelationType),
        args: RelationArgs,
        resolve: resolver(Relation),
      },
      roomrels: {
        type: new GraphQLList(RoomRelType),
        args: RelationArgs,
        resolve: resolver(RoomRel),
      },
      textrels: {
        type: new GraphQLList(TextRelType),
        args: RelationArgs,
        resolve: resolver(TextRel),
      },
      threadrels: {
        type: new GraphQLList(ThreadRelType),
        args: RelationArgs,
        resolve: resolver(ThreadRel),
      },
      topicrels: {
        type: new GraphQLList(TopicRelType),
        args: RelationArgs,
        resolve: resolver(TopicRel),
      },
      privrels: {
        type: new GraphQLList(PrivRelType),
        args: RelationArgs,
        resolve: resolver(PrivRel),
      },
    };
  }
});

const Schema = new GraphQLSchema({
  query: QueryType
});

export default Schema;
