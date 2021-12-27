import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
    query getAllEvents {
        events {
            id
            title
            desc
            date
        }
    }
`;

export const GET_EVENT = gql`
    query event($id: ID!) {
        event(id: $id) {
            id
            title
            user {
                id
            }
            location_id
            participants {
                user {
                    id
                }
            }
        }
    }
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
