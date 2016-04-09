/* @flow */

import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';

const CountsFields = {
  counts: {
    type: new GraphQLObjectType({
      name: 'ItemCounts',
      fields: () => ({
        children: {
          type: GraphQLInt,
          resolve(counts) {
            return counts ? counts.children : null;
          }
        }
      })
    }),
    resolve(entity) {
      return entity.counts;
    }
  },
};

export default CountsFields;
