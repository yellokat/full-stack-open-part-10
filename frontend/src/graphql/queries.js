import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    fullName
                    stargazersCount
                    reviewCount
                    ratingAverage
                    forksCount
                    description
                    language
                }
            }
        }
    }
`;
