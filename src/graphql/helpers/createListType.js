/* @flow */

import {
  GraphQLList,
} from 'graphql';

import {
  resolver,
  defaultListArgs,
} from 'graphql-sequelize';

type ListType = {
  type: Object;
  resolve: Function;
  args: Object;
}

export default function createListType(GraphQLType: Object, Model: { findAll: () => Promise<Array<any>> }, args?: Object): ListType {
  return {
    type: new GraphQLList(GraphQLType),
    resolve: resolver(Model),
    args: Object.assign(defaultListArgs(), args),
  };
}
