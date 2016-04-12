/* @flow */

import {
  GraphQLString,
} from 'graphql';

import createListType from './createListType';

const EntityArgs = {
  id: {
    type: GraphQLString,
  },
};

type ListType = {
  type: Object;
  resolve: Function;
  args: Object;
}

export default function createEntityListType(GraphQLType: Object, Model: { findAll: () => Promise<Array<any>> }): ListType {
  return createListType(GraphQLType, Model, EntityArgs);
}
