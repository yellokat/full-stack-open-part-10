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
    query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String!) {
        repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
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
    query getRepository($id: ID!, $pageSize: Int!, $after:String!) {
        repository(id: $id){
            url
            fullName
            stargazersCount
            reviewCount
            ratingAverage
            forksCount
            description
            language
            reviews(first:$pageSize, after: $after) {
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
                pageInfo {
                    endCursor,
                    startCursor,
                    hasNextPage
                }
            }
        }
    }
`

export const ME = gql`
    query getCurrentUser($includeReviews: Boolean=false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
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
                        repository {
                            fullName
                            id
                        }
                    }
                }
            }
        }
    }
`
