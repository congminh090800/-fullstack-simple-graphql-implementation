const { ApolloServer } = require('apollo-server');
const excutableSchema=require('./graphql_schema');


const server = new ApolloServer({schema:excutableSchema});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`Apollo Server ready at ${url}`);
});

module.exports=server;

