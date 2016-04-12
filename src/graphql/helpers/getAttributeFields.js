/* @flow */

import {
  attributeFields,
} from 'graphql-sequelize';

const fieldOptions = {
  exclude: [
    'counts',
    'meta',
    'params',
    'resources',
  ],
};

export default function getAttributeFields(Model: Object, fields?: { [key: string]: Object }): { [key: string]: Object } {
  return Object.assign(attributeFields(Model, fieldOptions), fields);
}
