import mongoose from "mongoose";

export const Mutation = {
    // User
    addUser: async (_, { data }, { pubsub, _db }) => {
        const newUser = new _db.User({ ...data });

        const user = await newUser.save();

        pubsub.publish("userCreated", { userCreated: user });
        return user;
    },
    updateUser: async (_, { id, data }, { pubsub, _db }) => {
        const isExist = await _db.User.findById(id);
        if (!isExist) throw new Error("User not found!");

        const updated_user = await _db.User.findByIdAndUpdate(id, data, {
            new: true,
        });

        pubsub.publish("userUpdated", { userUpdated: updated_user });
        return updated_user;
    },
    deleteUser: async (_, { id }, { pubsub, _db }) => {
        const isExist = await _db.User.findById(id);
        if (!isExist) throw new Error("User not found!");

        const deleted_user = await _db.User.findByIdAndDelete(id);

        pubsub.publish("userDeleted", { userDeleted: deleted_user });
        return deleted_user;
    },
    deleteAllUsers: async (_, __, { _db }) => {
        const deleted_users = await _db.User.deleteMany({});

        return {
            count: deleted_users.deletedCount,
        };
    },

    // Event
    addEvent: async (_, { data }, { pubsub, _db }) => {
        const newEvent = new _db.Event({ ...data });
        const event = await newEvent.save();

        const user = await _db.User.findById(
            mongoose.Types.ObjectId(data.user)
        );
        await user.events.push(event._id);
        await user.save();

        const location = await _db.Location.findById(
            mongoose.Types.ObjectId(data.location)
        );
        await location.events.push(event._id);
        await location.save();

        pubsub.publish("eventCreated", { eventCreated: event });
        return event;
    },
    updateEvent: async (_, { id, data }, { pubsub, _db }) => {
        const isExist = await _db.Event.findById(id);

        if (!isExist) throw new Error("Event not found!");

        if (data.location) {
            // if query changes the location

            // Delete this event from the old location's events array
            const oldLocation = await _db.Location.findById(
                mongoose.Types.ObjectId(isExist.location)
            );
            await oldLocation.events.pull({ _id: mongoose.Types.ObjectId(id) });
            await oldLocation.save();

            // Add this event to the new location's events array
            const newLocation = await _db.Location.findById(
                mongoose.Types.ObjectId(data.location)
            );
            await newLocation.events.push(id);
            await newLocation.save();
        }

        if (data.user) {
            // if query changes the user

            // Delete this event from the old user's events array
            const oldUser = await _db.User.findById(
                mongoose.Types.ObjectId(isExist.user)
            );
            await oldUser.events.pull({ _id: mongoose.Types.ObjectId(id) });
            await oldUser.save();

            // Add this event to the new user's events array
            const newUser = await _db.User.findById(
                mongoose.Types.ObjectId(data.user)
            );
            await newUser.events.push(id);
            await newUser.save();
        }

        const updated_event = await _db.Event.findByIdAndUpdate(id, data, {
            new: true,
        });
        pubsub.publish("eventUpdated", { eventUpdated: updated_event });
        return updated_event;
    },
    deleteEvent: async (_, { id }, { pubsub, _db }) => {
        const isExist = await _db.Event.findById(id);
        if (!isExist) throw new Error("Event not found!");

        const deleted_event = await _db.Event.findByIdAndDelete(id);

        const user = await _db.User.findById(
            mongoose.Types.ObjectId(deleted_event.user)
        );
        await user.events.pull({ _id: mongoose.Types.ObjectId(isExist._id) });
        await user.save();

        const location = await _db.Location.findById(
            mongoose.Types.ObjectId(deleted_event.location)
        );
        await location.events.pull({
            _id: mongoose.Types.ObjectId(isExist._id),
        });
        await location.save();

        pubsub.publish("eventDeleted", { eventDeleted: deleted_event });
        return deleted_event;
    },
    deleteAllEvents: async (_, __, { _db }) => {
        const deleted_events = await _db.Event.deleteMany({});

        await _db.User.updateMany({}, { $set: { events: [] } }); // Delete all events from users collection
        await _db.Location.updateMany({}, { $set: { events: [] } }); // Delete all events from locations collection

        return {
            count: deleted_events.deletedCount,
        };
    },

    // Location
    addLocation: async (_, { data }, { _db }) => {
        const newLocation = new _db.Location({ ...data });
        const location = await newLocation.save();

        return location;
    },
    updateLocation: async (_, { id, data }, { _db }) => {
        const isExist = await _db.Location.findById(id);

        if (!isExist) throw new Error("Location not found!");

        const updated_location = await _db.Location.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );

        return updated_location;
    },
    deleteLocation: async (_, { id }, { _db }) => {
        const isExist = await _db.Location.findById(id);
        if (!isExist) throw new Error("Location not found!");

        const events = await _db.Event.find({
            location: mongoose.Types.ObjectId(id),
        });

        for (let i = 0; i < events.length; i++) {
            const event = events[i];

            const user = await _db.User.findById(event.user);
            await user.events.pull(mongoose.Types.ObjectId(event._id));
            await user.save();
        }

        await _db.Event.deleteMany({
            location: mongoose.Types.ObjectId(id),
        });

        await _db.Location.findByIdAndDelete(id);
        return isExist;
    },
    deleteAllLocations: async (_, __, { _db }) => {
        const deleted_locations = await _db.Location.deleteMany({});

        await _db.User.updateMany({}, { $set: { events: [] } }); // Delete all events from users collection
        await _db.Event.deleteMany({}); // Clear events collection

        return {
            count: deleted_locations.deletedCount,
        };
    },

    // Participant
    addParticipant: async (_, { data }, { pubsub, _db }) => {
        const newParticipant = new _db.Participant({ ...data });
        const participant = await newParticipant.save();

        const event = await _db.Event.findById(
            mongoose.Types.ObjectId(data.event)
        );
        await event.participants.push(mongoose.Types.ObjectId(participant._id));
        await event.save();

        pubsub.publish("participantAdded", {
            participantAdded: participant,
        });
        return participant;
    },
    updateParticipant: async (_, { id, data }, { pubsub, _db }) => {
        const isExist = await _db.Participant.findById(id);

        if (!isExist) throw new Error("Participant not found!");

        if (data.event) {
            // if query changes the event

            // Delete this participant from the old event
            const oldEvent = await _db.Event.findById(
                mongoose.Types.ObjectId(isExist.event)
            );
            await oldEvent.participants.pull({
                _id: mongoose.Types.ObjectId(id),
            });
            await oldEvent.save();

            // Add this participant to the new event
            const newEvent = await _db.Event.findById(
                mongoose.Types.ObjectId(data.event)
            );
            await newEvent.participants.push(id);
            await newEvent.save();
        }

        const updated_participant = await _db.Participant.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );

        pubsub.publish("participantUpdated", {
            participantUpdated: updated_participant,
        });
        return updated_participant;
    },
    deleteParticipant: async (_, { id }, { pubsub, _db }) => {
        const isExist = await _db.Participant.findById(id);
        if (!isExist) throw new Error("Participant not found!");

        const deleted_participant = await _db.Participant.findByIdAndDelete(id);

        const event = await _db.Event.findOne({
            participants: {
                _id: id,
            },
        });
        await event.participants.pull(mongoose.Types.ObjectId(id));
        await event.save();

        pubsub.publish("participantDeleted", {
            participantDeleted: deleted_participant,
        });
        return isExist;
    },
    deleteAllParticipants: async (_, __, { _db }) => {
        const deleted_participants = await _db.Participant.deleteMany({});

        await _db.Event.updateMany({}, { $set: { participants: [] } });

        return { count: deleted_participants.deletedCount };
    },
};
