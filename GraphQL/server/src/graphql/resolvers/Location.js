export const Location = {
    event: (parent, __, { db }) =>
        db.events.find((event) => parent.id === event.location_id),
};
