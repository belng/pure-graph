/* @flow */

import {
  GraphQLString,
} from 'graphql';

import createListType from './createListType';

const RelationArgs = {
  user: {
    type: GraphQLString,
  },
  item: {
    type: GraphQLString,
  },
};

type ListType = {
  type: Object;
  resolve: Function;
  args: Object;
}

export default function createRelationListType(GraphQLType: Object, Model: { findAll: () => Promise<Array<any>> }): ListType {
  return createListType(GraphQLType, Model, RelationArgs);
}
