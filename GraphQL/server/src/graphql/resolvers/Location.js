export const Location = {
    events: async (parent, __, { _db }) => {
        const events = await _db.Event.find({ location: parent.id });
        return events;
    },
};
