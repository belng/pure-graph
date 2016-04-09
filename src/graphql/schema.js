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
import UserFields from './fields/UserFields';

const fieldOptions = {
  exclude: [ 'counts', 'meta', 'params', 'resources' ],
  map: {
    createtime: 'createTime',
    updatetime: 'updateTime',
    deletetime: 'deleteTime',
    presencetime: 'presenceTime',
  }
};

const PrivType = new GraphQLObjectType({
  name: 'Priv',
  description: 'Represents a private chat',
  fields: () => Object.assign(attributeFields(Priv, fieldOptions), {
    rels: {
      type: new GraphQLList(PrivRelType),
      resolve(entity) {
        return entity.getPrivrels();
      }
    }
  })
});

const RoomType = new GraphQLObjectType({
  name: 'Room',
  description: 'Represents a Room',
  fields: () => Object.assign(attributeFields(Room, fieldOptions), {
    rels: {
      type: new GraphQLList(RoomRelType),
      resolve(entity) {
        return entity.getRoomrels();
      }
    }
  })
});

const TextType = new GraphQLObjectType({
  name: 'Text',
  description: 'Represents a Text',
  fields: () => Object.assign(attributeFields(Text, fieldOptions), {
    rels: {
      type: new GraphQLList(TextRelType),
      resolve(entity) {
        return entity.getTextrels();
      }
    }
  })
});

const ThreadType = new GraphQLObjectType({
  name: 'Thread',
  description: 'Represents a Thread',
  fields: () => Object.assign(attributeFields(Thread, fieldOptions), {
    rels: {
      type: new GraphQLList(ThreadRelType),
      resolve(entity) {
        return entity.getThreadrels();
      }
    }
  })
});

const TopicType = new GraphQLObjectType({
  name: 'Topic',
  description: 'Represents a Topic',
  fields: () => Object.assign(attributeFields(Topic, fieldOptions), {
    rel: {
      type: new GraphQLList(TopicRelType),
      resolve(entity) {
        return entity.getTopicrels();
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => Object.assign(attributeFields(User, fieldOptions), UserFields, {
    rels: {
      type: new GraphQLList(RelationType),
      resolve(entity) {
        return entity.getRels();
      }
    },
    roomrels: {
      type: new GraphQLList(RoomRelType),
      resolve(entity) {
        return entity.getRoomrels();
      }
    },
    textrels: {
      type: new GraphQLList(TextRelType),
      resolve(entity) {
        return entity.getTextrels();
      }
    },
    threadrels: {
      type: new GraphQLList(ThreadRelType),
      resolve(entity) {
        return entity.getThreadrels();
      }
    },
    topicrels: {
      type: new GraphQLList(TopicRelType),
      resolve(entity) {
        return entity.getTopicrels();
      }
    },
    privrels: {
      type: new GraphQLList(PrivRelType),
      resolve(entity) {
        return entity.getPrivrels();
      }
    },
  })
});

const relationFields = {
  user: {
    type: UserType,
    resolve(rel) {
      return db.models.user.findAll({ where: { id: rel.user } }).then(users => users[0]);
    }
  }
};

const RelationType = new GraphQLObjectType({
  name: 'Relation',
  description: 'This represents a Relation',
  fields: () => Object.assign(attributeFields(Relation, fieldOptions), relationFields)
});

const RoomRelType = new GraphQLObjectType({
  name: 'RoomRel',
  description: 'This represents a Relation',
  fields: () => Object.assign(attributeFields(RoomRel, fieldOptions), relationFields, {
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
  fields: () => Object.assign(attributeFields(TextRel, fieldOptions), relationFields, {
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
  fields: () => Object.assign(attributeFields(ThreadRel, fieldOptions), relationFields, {
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
  fields: () => Object.assign(attributeFields(TopicRel, fieldOptions), relationFields, {
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
  fields: () => Object.assign(attributeFields(PrivRel, fieldOptions), relationFields, {
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

const Query = new GraphQLObjectType({
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
  query: Query,
});

export default Schema;
