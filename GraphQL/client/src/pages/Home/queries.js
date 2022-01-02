import { gql } from "@apollo/client";
import { eventFragment } from "./fragments";

export const GET_EVENTS = gql`
    query getAllEvents {
        events {
            ...EventFragment
        }
    }
    ${eventFragment}
`;

export const EVENTS_SUBSCRIPTION = gql`
    subscription {
        eventCreated {
            ...EventFragment
        }
    }
    ${eventFragment}
`;

export const CREATE_EVENT = gql`
    mutation addEvent($data: addEventInput!) {
        addEvent(data: $data) {
            id
            title
            desc
            date
            from
            to
            user {
                username
                email
            }
            location {
                name
                desc
                lat
                lng
            }
        }
    }
`;

export const GET_USERS = gql`
    query getAllUsers {
        users {
            id
            username
        }
    }
`;

export const GET_LOCATIONS = gql`
    query getAllLocations {
        locations {
            id
            name
        }
    }
`;
