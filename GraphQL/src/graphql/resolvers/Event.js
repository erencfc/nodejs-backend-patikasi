export const Event = {
    user: (parent, __, { db }) =>
        db.users.find((user) => user.id === parent.user_id),
    location: (parent, __, { db }) =>
        db.locations.find((location) => location.id === parent.location_id),
    participants: (parent, __, { db }) =>
        db.participants.filter(
            (participant) => parent.id === participant.event_id
        ),
};
