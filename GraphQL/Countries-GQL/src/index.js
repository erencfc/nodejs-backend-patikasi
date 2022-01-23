import { GraphQLServer, PubSub } from "graphql-yoga";

import resolvers from "@graphql/resolvers";
import typeDefs from "@graphql/type-defs";

import { continents, countries, languages } from "countries-list";

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        pubsub,
        continents,
        countries,
        languages,
    },
});

server.start(() => console.log("Server is running on localhost:4000"));
