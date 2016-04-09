/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
  GraphQLEnumType
} from 'graphql';

const EntityFields = {
  counts: {
    type: new GraphQLObjectType({
      name: 'counts',
      description: 'Represents various counts',
      fields: () => ({
        threads: {
          type: GraphQLInt,
          resolve(counts) {
            return counts ? counts.threads : null;
          }
        }
      })
    }),
    resolve(entity) {
      return entity.counts;
    }
  },
  params: {
    type: new GraphQLObjectType({
      name: 'params',
      description: 'User settings',
      fields: () => ({
        email: {
          type: new GraphQLObjectType({
            name: 'email',
            description: 'Email settings',
            fields: () => ({
              notifications: {
                type: GraphQLBoolean,
                resolve(email) {
                  return email.notifications;
                }
              },
              frequency: {
                type: new GraphQLEnumType({
                  name: 'frequency',
                  values: {
                    'daily': { value: 'daily' },
                    'never': { value: 'never' },
                  }
                }),
                resolve(email) {
                  return email.frequency;
                }
              }
            })
          }),
          resolve(params) {
            return params.email;
          }
        }
      })
    }),
    resolve(entity) {
      return entity.meta;
    }
  },
}

export default EntityFields;
