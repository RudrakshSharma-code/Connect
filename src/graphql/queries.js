/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      userID
      firstName
      lastName
      email
      phone
      title
      items
      itemsCount
      latitude
      longitude
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        firstName
        lastName
        email
        phone
        title
        items
        itemsCount
        latitude
        longitude
      }
      nextToken
    }
  }
`;
