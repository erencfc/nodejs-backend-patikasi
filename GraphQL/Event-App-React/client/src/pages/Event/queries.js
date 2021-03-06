import { gql } from "@apollo/client";
import { participantFragment } from "./fragments";

export const GET_EVENT_DETAILS = gql`
    query getEventDetails($id: ID!) {
        event(id: $id) {
            title
            desc
            date
            from
            to
        }
    }
`;

export const GET_EVENT_LOCATION = gql`
    query getEventLocation($id: ID!) {
        event(id: $id) {
            location {
                name
                desc
                lat
                lng
            }
        }
    }
`;

export const GET_EVENT_PARTICIPANTS = gql`
    query getEventParticipants($id: ID!) {
        event(id: $id) {
            participants {
                ...ParticipantFragment
            }
        }
    }
    ${participantFragment}
`;

export const PARTICIPANTS_SUBSCRIPTION = gql`
    subscription participantAdded($event_id: ID) {
        participantAdded(event_id: $event_id) {
            ...ParticipantFragment
        }
    }
    ${participantFragment}
`;

export const GET_EVENT_OWNER = gql`
    query getEventOwner($id: ID!) {
        event(id: $id) {
            user {
                username
                email
            }
        }
    }
`;
