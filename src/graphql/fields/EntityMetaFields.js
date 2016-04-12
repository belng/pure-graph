/* @flow */

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const EntityMetaFields: { [key: string]: Object } = {
  meta: {
    type: new GraphQLObjectType({
      name: 'meta',
      fields: () => ({
        picture: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        photo: {
          type: new GraphQLObjectType({
            name: 'photo',
            fields: () => ({
              height: {
                type: GraphQLInt,
              },
              width: {
                type: GraphQLInt,
              },
              title: {
                type: GraphQLString,
              },
              url: {
                type: GraphQLString,
              },
              thumbnail_height: {
                type: GraphQLInt,
              },
              thumbnail_width: {
                type: GraphQLInt,
              },
              thumbnail_url: {
                type: GraphQLString,
              },
              type: {
                type: GraphQLString,
              },
            }),
          }),
        },
      }),
    }),
  },
};

export default EntityMetaFields;
