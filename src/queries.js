import {gql} from "@apollo/client";

export const ALL_AUTHORS =  gql`
    query {
        allAuthors {
            name
            born
            nbBooks
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author
        }
    }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author
        published
        genres
    }
}
`

export const EDIT_BORN = gql`
mutation editAuthor($name: String!, $setBornTo: String!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        name
        born
    }
}
`

export const LOGIN = gql`
mutation login($surname: String!, $password: String!) {
    login(username: $username, password: $password) {
        value
    }
}
`