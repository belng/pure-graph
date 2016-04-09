/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';

import EntityFields from './EntityFields';

const UserFields = {
  ...EntityFields,
}

export default UserFields;
