import {gql} from "@apollo/client";

export const SIGN_IN  = gql`
    mutation($username: String!, $password: String!) {
        authenticate(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
        createReview(review: { ownerName: $ownerName, repositoryName: $repositoryName, rating: $rating, text: $text }) {
            createdAt
            id
            rating
            repositoryId
            text
            userId
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation DeleteReview($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`
