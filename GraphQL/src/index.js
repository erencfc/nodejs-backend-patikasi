const { GraphQLServer, PubSub } = require("graphql-yoga");

const resolvers = require("./graphql/resolvers/index");
const typeDefs = require("./graphql/type-defs");

const db = require("./data.json");

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        pubsub,
        db,
    },
});

server.start(() => console.log("Server is running on localhost:4000"));
