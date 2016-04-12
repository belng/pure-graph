/* @flow */

import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLString,
} from 'graphql';

const ParamsFields: { [key: string]: Object } = {
  params: {
    type: new GraphQLObjectType({
      name: 'params',
      fields: () => ({
        email: {
          type: new GraphQLObjectType({
            name: 'email',
            fields: () => ({
              notifications: {
                type: GraphQLBoolean,
              },
              frequency: {
                type: new GraphQLEnumType({
                  name: 'frequency',
                  values: {
                    daily: { value: 'daily' },
                    never: { value: 'never' },
                  },
                }),
              },
            }),
          }),
        },
        facebook: {
          type: new GraphQLObjectType({
            name: 'facebook',
            fields: () => ({
              name: {
                type: GraphQLString,
              },
              picture: {
                type: GraphQLString,
              },
              verified: {
                type: GraphQLBoolean,
              },
            }),
          }),
        },
        google: {
          type: new GraphQLObjectType({
            name: 'google',
            fields: () => ({
              name: {
                type: GraphQLString,
              },
              picture: {
                type: GraphQLString,
              },
              verified: {
                type: GraphQLBoolean,
              },
            }),
          }),
        },
      }),
    }),
  },
};

export default ParamsFields;
