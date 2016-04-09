/* @flow */

import koa from 'koa';
import mount from 'koa-mount';
import graphql from 'koa-graphql';
import schema from './graphql/schema';
import config from '../config.json';

const app = koa();

app.use(mount('/graph', graphql({
  schema,
  pretty: process.env.NODE_ENV !== 'production',
  graphiql: true
})));

app.listen(config.server.port);
