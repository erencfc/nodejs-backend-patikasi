const Participant = {
    user: (parent, __, { db }) =>
        db.users.find((user) => user.id === parent.user_id),
    username: (parent, __, { db }) =>
        db.users.find((user) => user.id === parent.user_id).username,
    id: (parent, __, { db }) =>
        db.users.find((user) => user.id === parent.user_id).id,
    event: (parent, __, { db }) =>
        db.events.filter((event) => event.id === parent.event_id),
};

module.exports.Participant = Participant;
