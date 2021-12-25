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
        subscribe: (_, __, { pubsub }) =>
            pubsub.asyncIterator("participantAdded"),
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
