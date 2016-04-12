/* @flow */

import DataLoader from 'dataloader';

export default function createEntityLoader(Model: { findAll: () => Promise<Array<any>> }): DataLoader {
  return new DataLoader((ids) => {
    return Model.findAll({ where: { id: ids } });
  });
}
