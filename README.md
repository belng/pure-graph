GraphQL Backend for Pure
========================

GraphQL server which connects to a postgres database providing read-only access to the data. GraphQL allows to do deeply nested queries easily, for example, the following will return the current user, their related rooms, threads in those rooms, texts in those threads, and creator details for the text.

```graphql
query {
  users(id: "satya164") {
    id
    name
    roomrels(limit: 10) {
      room {
        id
        name
        threads(limit: 5) {
          id
          name
          body
          updatetime
          texts(limit: 5) {
            id
            body
            updatetime
            creator {
              id
              name
              meta {
                picture
              }
            }
          }
        }
      }
    }
  }
}
```

## Setup

1. Clone the repo, and run `npm install`.
2. Create a `config.json` in the repo root with the following details (swap the values with appropriate ones) ,

  ```json
  {
    "server": {
      "port": 5030
    },
    "postgres": {
      "db": "pure",
      "user": "postgres",
      "password": "password",
      "host": "localhost"
    }
  }
  ```
3. Run `npm start` to start the GraphQL server.

## Making queries

You can visit `/graphql` in your browser to access the GraphiQL interface where you can view the docs as well as type the queries with autocomplete to get the results.

### Terminal

```sh
curl -XPOST -H 'Content-Type:application/graphql' -d 'query { users(id: "satya164") { name } }' 'http://localhost:5030/graphql'
```

### JavaScript

```js
let query = `
query {
  users(id: "satya164") {
    name
  }
}
`;

fetch(`/graphql?query=${encodeURIComponent(query)}`).then(data => data.json()).then(data => console.log(data));
```
