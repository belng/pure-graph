/* @flow */

export default function childrenResolver(Model: { findAll: () => Promise<Array<any>> }): Function {
  return function resolveChildren(entity, args) {
    return Model.findAll({
      limit: args.limit,
      order: args.order,
      where: { parents: { $contains: [ entity.id ] }, ...args.where },
    });
  };
}
