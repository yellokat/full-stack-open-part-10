import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation($username: String!, $password: String!) {
        createUser(user: { username: $username, password: $password }) {
            id
            username
        }
    }
`

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    id
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

export const GET_REPOSITORY = gql`
    query getRepository($id: ID!) {
        repository(id: $id){
            url
            fullName
            stargazersCount
            reviewCount
            ratingAverage
            forksCount
            description
            language
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`
