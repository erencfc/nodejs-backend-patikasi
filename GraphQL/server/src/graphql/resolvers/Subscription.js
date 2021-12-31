import { withFilter } from "graphql-yoga";

export const Subscription = {
    // User
    userCreated: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userCreated"),
    },
    userUpdated: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userUpdated"),
    },
    userDeleted: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userDeleted"),
    },

    // Event
    eventCreated: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("eventCreated"),
    },
    eventUpdated: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("eventUpdated"),
    },
    eventDeleted: {
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("eventDeleted"),
    },

    // Participant
    participantAdded: {
        subscribe: withFilter(
            (_, __, { pubsub }) => pubsub.asyncIterator("participantAdded"),
            (payload, variables) =>
                payload.participantAdded.event_id == variables.event_id
        ),
    },
    participantUpdated: {
        subscribe: (_, __, { pubsub }) =>
            pubsub.asyncIterator("participantUpdated"),
    },
    participantDeleted: {
        subscribe: (_, __, { pubsub }) =>
            pubsub.asyncIterator("participantDeleted"),
    },
};
