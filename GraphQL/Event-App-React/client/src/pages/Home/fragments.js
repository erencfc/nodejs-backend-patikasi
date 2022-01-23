import { gql } from "@apollo/client";

export const eventFragment = gql`
    fragment EventFragment on Event {
        id
        title
        desc
        date
    }
`;
