const { GraphQLServer, PubSub } = require("graphql-yoga");
const { nanoid } = require("nanoid");

const { events, locations, users, participants } = require("./data.json");

const typeDefs = `
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

    # User Inputs

    input addUserInput {
        username: String!
        email: String!
    }

    input updateUserInput {
        username: String
        email: String
    }

    # Event Inputs

    input addEventInput {
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: Int!
        user_id: Int!
    }

    input updateEventInput {
        title: String
        desc: String
        date: String
        from: String
        to: String
        location_id: Int
        user_id: Int
    }

    # Location Inputs

    input addLocationInput {
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    input updateLocationInput {
        name: String
        desc: String
        lat: Float
        lng: Float
    }

    # Participant Inputs

    input addParticipantInput {
        user_id: Int!
        event_id: Int!
    }

    input updateParticipantInput {
        user_id: Int
        event_id: Int
    }

    type deleteAllOutput {
        count: Int
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

    type Mutation {
        # User
        addUser(data: addUserInput!): User!
        updateUser(id: ID!, data: updateUserInput!): User!
        deleteUser(id: ID!): User!
        deleteAllUsers: deleteAllOutput!

        # Event
        addEvent(data: addEventInput!): Event!
        updateEvent(id: ID!, data: updateEventInput!): Event!
        deleteEvent(id: ID!): Event!
        deleteAllEvents: deleteAllOutput!

        # Location
        addLocation(data: addLocationInput!): Location!
        updateLocation(id: ID!, data: updateLocationInput!): Location!
        deleteLocation(id: ID!): Location!
        deleteAllLocations: deleteAllOutput!

        # Participant
        addParticipant(data: addParticipantInput!): Participant!
        updateParticipant(id: ID!, data: updateParticipantInput!): Participant!
        deleteParticipant(id: ID!): Participant!
        deleteAllParticipants: deleteAllOutput!
    }
`;

const resolvers = {
    Mutation: {
        // User
        addUser: (parent, { data }) => {
            const user = {
                id: nanoid(),
                ...data,
            };
            users.push(user);
            return user;
        },
        updateUser: (parent, { id, data }) => {
            const user_index = users.findIndex((user) => user.id == id);
            if (user_index === "-1") throw new Error("User not found!");
            const updated_user = (users[user_index] = {
                ...users[user_index],
                ...data,
            });
            return updated_user;
        },
        deleteUser: (parent, { id }) => {
            const user_index = users.findIndex((user) => user.id == id);
            if (user_index === -1) throw new Error("User not found!");
            const deleted_user = users[user_index];
            users.splice(user_index, 1);

            return deleted_user;
        },
        deleteAllUsers: () => {
            const length = users.length;
            users.splice(0, length);

            return {
                count: length,
            };
        },

        // Event
        addEvent: (parent, { data }) => {
            const event = {
                id: nanoid(),
                ...data,
            };
            events.push(event);
            return event;
        },
        updateEvent: (parent, { id, data }) => {
            const event_index = events.findIndex((event) => event.id == id);
            if (event_index === "-1") throw new Error("Event not found!");
            const updated_event = (events[event_index] = {
                ...events[event_index],
                ...data,
            });
            return updated_event;
        },
        deleteEvent: (parent, { id }) => {
            const event_index = events.findIndex((event) => event.id == id);
            if (event_index === -1) throw new Error("Event not found!");
            const deleted_event = events[event_index];
            events.splice(event_index, 1);

            return deleted_event;
        },
        deleteAllEvents: () => {
            const length = events.length;
            events.splice(0, length);

            return {
                count: length,
            };
        },

        // Location
        addLocation: (parent, { data }) => {
            const location = {
                id: nanoid(),
                ...data,
            };
            locations.push(location);
            return location;
        },
        updateLocation: (parent, { id, data }) => {
            const location_index = locations.findIndex(
                (location) => location.id == id
            );
            if (location_index === "-1") throw new Error("Location not found!");
            const updated_location = (locations[location_index] = {
                ...locations[location_index],
                ...data,
            });
            return updated_location;
        },
        deleteLocation: (parent, { id }) => {
            const location_index = locations.findIndex(
                (location) => location.id == id
            );
            if (location_index === -1) throw new Error("Location not found!");
            const deleted_location = locations[location_index];
            locations.splice(location_index, 1);

            return deleted_location;
        },
        deleteAllLocations: () => {
            const length = locations.length;
            locations.splice(0, length);

            return {
                count: length,
            };
        },

        // Participant
        addParticipant: (parent, { data }) => {
            const participant = {
                id: nanoid(),
                ...data,
            };
            participants.push(participant);
            return participant;
        },
        updateParticipant: (parent, { id, data }) => {
            const participant_index = participants.findIndex(
                (participant) => participant.id == id
            );
            if (participant_index === "-1")
                throw new Error("Participant not found!");
            const updated_participant = (participants[participant_index] = {
                ...participants[participant_index],
                ...data,
            });
            return updated_participant;
        },
        deleteParticipant: (parent, { id }) => {
            const participant_index = participants.findIndex(
                (participant) => participant.id == id
            );
            if (participant_index === -1)
                throw new Error("Participant not found!");
            const deleted_participant = participants[participant_index];
            participants.splice(participant_index, 1);

            return deleted_participant;
        },
        deleteAllParticipants: () => {
            const length = participants.length;
            participants.splice(0, length);

            return {
                count: length,
            };
        },
    },

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

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log("Server is running on localhost:4000"));
