/* @flow */

import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';

const EntityFields = {
  counts: {
    type: new GraphQLObjectType({
      name: 'counts',
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

export default EntityFields;
