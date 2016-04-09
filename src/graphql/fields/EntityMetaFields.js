/* @flow */

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const EntityMetaFields = {
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
        photo: {
          type: new GraphQLObjectType({
            name: 'photo',
            fields: () => ({
              height: {
                type: GraphQLInt,
                resolve(photo) {
                  return photo.height;
                }
              },
              width: {
                type: GraphQLInt,
                resolve(photo) {
                  return photo.width;
                }
              },
              title: {
                type: GraphQLString,
                resolve(photo) {
                  return photo.title;
                }
              },
              url: {
                type: GraphQLString,
                resolve(photo) {
                  return photo.title;
                }
              },
              thumbnail_height: {
                type: GraphQLInt,
                resolve(photo) {
                  return photo.thumbnail_height;
                }
              },
              thumbnail_width: {
                type: GraphQLInt,
                resolve(photo) {
                  return photo.thumbnail_width;
                }
              },
              thumbnail_url: {
                type: GraphQLString,
                resolve(photo) {
                  return photo.thumbnail_url;
                }
              },
              type: {
                type: GraphQLString,
                resolve(photo) {
                  return photo.type;
                }
              },
            })
          }),
          resolve(meta) {
            return meta.photo;
          }
        },
      })
    }),
    resolve(entity) {
      return entity.meta;
    }
  },
};

export default EntityMetaFields;
