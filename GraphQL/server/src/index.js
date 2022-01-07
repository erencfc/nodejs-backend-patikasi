import { GraphQLServer, PubSub } from "graphql-yoga";

import resolvers from "@graphql/resolvers";
import typeDefs from "@graphql/type-defs";

import db from "./db";
db();

// Models
import User from "./models/User";
import Event from "./models/Event";
import Location from "./models/Location";
import Participant from "./models/Participant";

// fake data
import data from "./data";

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        pubsub,
        db: data,
        _db: {
            User,
            Event,
            Location,
            Participant,
        },
    },
});

server.start(() => console.log("Server is running on localhost:4000"));
