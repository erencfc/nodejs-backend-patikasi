export const Event = {
    user: async (parent, __, { _db }) => {
        const user = await _db.User.findById(parent.user._id);
        return user;
    },
    location: async (parent, __, { _db }) => {
        const location = await _db.Location.findById(parent.location._id);
        return location;
    },
    participants: async (parent, __, { _db }) => {
        const participants = await _db.Participant.find({ event: parent.id });
        return participants;
    },
};
