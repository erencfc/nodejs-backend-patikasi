export const Participant = {
    user: async (parent, __, { _db }) =>
        await _db.User.findById(parent.user._id),
    event: async (parent, __, { _db }) =>
        await _db.Event.findById(parent.event._id),
};
