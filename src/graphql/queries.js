/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      items
      itemsCount
      latitude
      longitude
      userID
      userFirstName
      userLastName
      userEmail
      userPhone
      volunteerID
      volunteerFirstName
      volunteerLastName
      volunteerEmail
      volunteerPhone
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
        title
        items
        itemsCount
        latitude
        longitude
        userID
        userFirstName
        userLastName
        userEmail
        userPhone
        volunteerID
        volunteerFirstName
        volunteerLastName
        volunteerEmail
        volunteerPhone
      }
      nextToken
    }
  }
`;
