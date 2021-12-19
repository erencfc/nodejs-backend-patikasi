const { ApolloServer, gql } = require("apollo-server");
const {
    ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { events, locations, users, participants } = require("./data.json");

const typeDefs = gql`
    type Event {
        id: ID!
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: Int!
        user_id: Int!
        user: User!
        location: Location!
        participants: [Participant]!
    }

    type Location {
        id: ID!
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
        event: Event
    }

    type User {
        id: ID!
        username: String!
        email: String!
        events: [Event]!
    }

    type Participant {
        id: ID!
        user_id: Int!
        event_id: Int!
        user: User!
        username: String
        event: [Event]!
    }

    type Query {
        events: [Event!]!
        event(id: ID!): Event!

        locations: [Location!]!
        location(id: ID!): Location!

        users: [User!]!
        user(id: ID!): User!

        participants: [Participant!]!
        participant(id: ID!): Participant!
    }
`;

const resolvers = {
    Query: {
        events: () => events,
        event: (parent, args) => events.find((event) => event.id == args.id),

        locations: () => locations,
        location: (parent, args) =>
            locations.find((location) => location.id == args.id),

        users: () => users,
        user: (parent, args) => users.find((user) => user.id == args.id),

        participants: () => participants,
        participant: (parent, args) =>
            participants.find((participant) => participant.id == args.id),
    },

    Event: {
        user: (parent, args) =>
            users.find((user) => user.id === parent.user_id),
        location: (parent, args) =>
            locations.find((location) => location.id === parent.location_id),
        participants: (parent, args) =>
            participants.filter(
                (participant) => parent.id === participant.event_id
            ),
    },

    User: {
        events: (parent, args) =>
            events.filter((event) => event.user_id === parent.id),
    },

    Participant: {
        user: (parent, args) =>
            users.find((user) => user.id === parent.user_id),
        username: (parent, args) =>
            users.find((user) => user.id === parent.user_id).username,
        id: (parent, args) =>
            users.find((user) => user.id === parent.user_id).id,
        event: (parent, args) =>
            events.filter((event) => event.id === parent.event_id),
    },

    Location: {
        event: (parent, args) =>
            events.find((event) => parent.id === event.location_id),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});
server.listen(80).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
