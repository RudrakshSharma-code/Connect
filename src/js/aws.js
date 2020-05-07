////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
import {API, graphqlOperation} from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions'
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from '../aws-exports';
API.configure(awsconfig);
PubSub.configure(awsconfig);
Amplify.configure(awsconfig);
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

export async function createPost(user, title, items, itemsCount, latitude, longitude) {
  const post = {
    "user": user,
    "title": title,
    "items": items, // array
    "itemsCount": itemsCount, // int
    "latitude": latitude, // string
    "longitude": longitude // string
  };
  const answer = await API.graphql(graphqlOperation(mutations.createPost, {
    "input": post,
    "condition": null
  }));
  return answer.data.createPost;
}

export async function updatePost(id, title, items, itemsCount, latitude, longitude) {
  const post = {
    "id": id,
    "title": title,
    "items": items, // array
    "itemsCount": itemsCount, // int
    "latitude": latitude, // string
    "longitude": longitude // string
  };
  const answer = await API.graphql(graphqlOperation(mutations.updatePost, {
    "input": post,
    "condition": null
  }));
  return answer.data.updatePost;
}

export async function deletePost(id) {
  const post = {
    "id": id
  };
  const answer = await API.graphql(graphqlOperation(mutations.deletePost, {
    "input": post,
    "condition": null
  }));
  return answer.data.deletePost;
}

export async function getPost(id) {
  const answer = await API.graphql(graphqlOperation(queries.getPost, {
    "id": id
  }));
  return answer.data.getPost;
}

export async function listPosts(filter) {
  // filter is optional
  // example
  // filter by user= {user: {eq: "userID"}};
  // filter by item = {items: {contains: "itemName"}};
  // filter by itemsCount = {itemsCount: {le: "someNumber"}};
  const limit = 50; // what this limit should be?
  let posts = [];
  let answer;
  let token;

  do {
    answer = await API.graphql(graphqlOperation(queries.listPosts, {
      "filter": filter,
      "limit": limit,
      "nextToken": token
    }));
    posts = posts.concat(answer.data.listPosts.items);
    token = answer.data.listPosts.nextToken;
  } while (token);

  return posts;
}

export function onCreatePost() {
  const listener = API.graphql(graphqlOperation(subscriptions.onCreatePost))
    .subscribe({
      next: (postData) => {
        console.log("On create post: ", postData.value.data.onCreatePost);
      }
    });
  return listener;
}

export function onUpdatePost() {
  const listener = API.graphql(graphqlOperation(subscriptions.onUpdatePost))
    .subscribe({
      next: (postData) => {
        console.log("On update post: ", postData.value.data.onUpdatePost);
      }
    });
  return listener;
}

export function onDeletePost() {
  const listener = API.graphql(graphqlOperation(subscriptions.onDeletePost))
    .subscribe({
      next: (postData) => {
        console.log("On delete post: ", postData.value.data.onDeletePost);
      }
    });
  return listener;
}

export function stopListener(listener) {
  listener.unsubscribe();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function testPosts() {
//   onCreatePost();
//   onUpdatePost();
//   onDeletePost();

//   setTimeout(async () => {
//    let answer = await createPost("user12345", "title12345", ["apple", "bananas"], 2, "48.8566", "2.3522");
//    console.log("Create post: ", answer);

//     answer = await updatePost(answer.id, "titleUpdated", ["toilet paper", "vodka"], 2, "48.9", "2.4");
//     console.log("Update post: ", answer);

//     answer = await getPost(answer.id);
//     console.log("Get post: ", answer);

//     answer = await deletePost(answer.id);
//     console.log("Delete post: ", answer);

//     answer = await listPosts();
//     console.log("List posts: ", answer);
//   }, 1000); // wait 1 second

// }

// testPosts();
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


export async function signUp(email, password, phone_number, given_name, family_name) {
  try {
    const user = await Auth.signUp({
      "username": email,
      "password": password,
      "attributes": {
        "given_name": given_name,
        "family_name": family_name,
        "phone_number": phone_number, // "+18882223344"
        'custom:latitude': "48.8566",
        'custom:longitude': "2.3522"
      }
    });
    
    return user;
  } catch (error) {
    return error;
  }
}

export async function resendConfirmationCode(email) {
  try {
    const answer = await Auth.resendSignUp(email);
    return answer;
  } catch (error) {
    return error;
  }
}


export async function confirmSignUp(email, code) {
  try {
    const user = await Auth.confirmSignUp(email, code);
    return user;
  } catch (error) {
    return error;
  }
}

export async function signIn(email, password) {
  try {
    const user = await Auth.signIn(email, password);
    return user;
  } catch (error) {
    return error;
  }
}

export async function signOut() {
  try {
    const user = await Auth.signOut();
    return user;
  } catch (error) {
    return error;
  }
}

export async function changePassword(oldPassword, newPassword) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const answer = await Auth.changePassword(user, oldPassword, newPassword);
    return answer;
  } catch (error) {
    return error;
  }
}

export async function forgotPassword(username) {
  try {
    const answer = await Auth.forgotPassword(username);
    return answer;
  } catch (error) {
    return error;
  }
}

export async function forgotPasswordSubmit(username, code, new_password) {
  try {
    const answer = Auth.forgotPasswordSubmit(username, code, new_password);
    return answer;
  } catch (error) {
    return error;
  }
}

export async function currentAuthenticatedUser() {
  try {
    const user = await Auth.currentAuthenticatedUser({bypassCache: false});
    return user;
  } catch (error) {
    return error;
  }
}

export async function currentSession() {
  try {
    const user = await Auth.currentSession()
    return user;
  } catch (error) {
    return error;
  }
}

export async function updateUserAttributes(user, given_name, family_name) {
  try {
    const answer = await Auth.updateUserAttributes(user, {'given_name': given_name, 'family_name': family_name});
    return answer;
  } catch (error) {
    return error;
  }
  
}

export async function updateUserCoordinates(user, latitude, longitude) {
  try {
    const answer = await Auth.updateUserAttributes(user, {'custom:latitude': latitude, 'custom:longitude': longitude});
    return answer;
  } catch (error) {
    return error;
  }
}