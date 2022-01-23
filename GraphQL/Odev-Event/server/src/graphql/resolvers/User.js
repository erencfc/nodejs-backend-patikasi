export const User = {
    events: async (parent, __, { _db }) => {
        const events = await _db.Event.find({ user: parent.id });
        return events;
    },
};
