export const Query = {
    // Event
    events: async (_, __, { _db }) => {
        const events = await _db.Event.find();
        return events;
    },
    event: async (_, args, { _db }) => {
        const event = await _db.Event.findById(args.id);
        return event;
    },

    // Location
    locations: async (_, __, { _db }) => {
        const locations = await _db.Location.find();
        return locations;
    },
    location: async (_, args, { _db }) => {
        const location = await _db.Location.findById(args.id);
        return location;
    },

    // User
    users: async (_, __, { _db }) => {
        const users = await _db.User.find();
        return users;
    },
    user: async (_, args, { _db }) => {
        const user = await _db.User.findById(args.id);
        return user;
    },

    // Participant
    participants: async (_, __, { _db }) => {
        const participants = await _db.Participant.find();
        return participants;
    },
    participant: async (_, args, { _db }) => {
        const participant = await _db.Participant.findById(args.id);
        return participant;
    },
};
