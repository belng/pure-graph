/* @flow */

import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';

const CountsFields: { [key: string]: Object } = {
  counts: {
    type: new GraphQLObjectType({
      name: 'ItemCounts',
      fields: {
        children: {
          type: GraphQLInt,
        },
      },
    }),
  },
};

export default CountsFields;
