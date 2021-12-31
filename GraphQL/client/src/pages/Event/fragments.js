import { gql } from "@apollo/client";

export const participantFragment = gql`
    fragment ParticipantFragment on Participant {
        user {
            username
            email
        }
    }
`;
