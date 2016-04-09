/* @flow */

import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLString,
} from 'graphql';

import EntityFields from './EntityFields';

const UserFields = {
  ...EntityFields,
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
                resolve(email) {
                  return email.notifications;
                }
              },
              frequency: {
                type: new GraphQLEnumType({
                  name: 'frequency',
                  values: {
                    daily: { value: 'daily' },
                    never: { value: 'never' },
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
        },
        facebook: {
          type: new GraphQLObjectType({
            name: 'facebook',
            fields: () => ({
              name: {
                type: GraphQLString,
                resolve(facebook) {
                  return facebook.name;
                }
              },
              picture: {
                type: GraphQLString,
                resolve(facebook) {
                  return facebook.picture;
                }
              },
              verified: {
                type: GraphQLBoolean,
                resolve(facebook) {
                  return facebook.verified;
                }
              },
            }),
            resolve(params) {
              return params.facebook;
            }
          }),
        },
        google: {
          type: new GraphQLObjectType({
            name: 'google',
            fields: () => ({
              name: {
                type: GraphQLString,
                resolve(google) {
                  return google.name;
                }
              },
              picture: {
                type: GraphQLString,
                resolve(google) {
                  return google.picture;
                }
              },
              verified: {
                type: GraphQLBoolean,
                resolve(google) {
                  return google.verified;
                }
              },
            }),
            resolve(params) {
              return params.google;
            }
          }),
        },
      })
    }),
    resolve(entity) {
      return entity.params;
    }
  },
  meta: {
    type: new GraphQLObjectType({
      name: 'meta',
      fields: () => ({
        picture: {
          type: GraphQLString,
          resolve(meta) {
            return meta.picture;
          }
        },
        description: {
          type: GraphQLString,
          resolve(meta) {
            return meta.description;
          }
        },
      })
    }),
    resolve(entity) {
      return entity.meta;
    }
  },
};

export default UserFields;
