////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
import { API, graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
API.configure(awsconfig);
PubSub.configure(awsconfig);
Amplify.configure(awsconfig);
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

export async function createPost(user, title, description) {
  const post = {"user": user, "title": title, "description": description};
  const answer = await API.graphql(graphqlOperation(mutations.createPost, { "input": post, "condition": null }));
  return answer.data.createPost;
}

export async function updatePost(id, title, description) {
  const post = {"id": id, "title": title, "description": description};
  const answer = await API.graphql(graphqlOperation(mutations.updatePost, { "input": post, "condition": null }));
  return answer.data.updatePost;
}

export async function deletePost(id) {
  const post = {"id": id};
  const answer = await API.graphql(graphqlOperation(mutations.deletePost, {"input": post, "condition": null }));
  return answer.data.deletePost;
}

export async function getPost(id) {
  const answer = await API.graphql(graphqlOperation(queries.getPost, {"id": id}));
  return answer.data.getPost;
}

export async function listPosts(filter) {
  // filter is optional
  // example
  // filter = {user: {eq: "userID"}};
  const limit = 50; // what this limit should be?
  let posts = [];
  let answer;
  let token;

  do {
    answer = await API.graphql(graphqlOperation(queries.listPosts, {"filter": filter, "limit": limit, "nextToken": token}));
    posts = posts.concat(answer.data.listPosts.items);
    token = answer.data.listPosts.nextToken;
  } while (token);

  return posts;
}

export function onCreatePost() {
  const listener = API.graphql(graphqlOperation(subscriptions.onCreatePost))
    .subscribe({next: (postData) => {
      console.log("On create post: ", postData.value.data.onCreatePost);
  }});
  return listener;
}

export function onUpdatePost() {
  const listener = API.graphql(graphqlOperation(subscriptions.onUpdatePost))
    .subscribe({next: (postData) => {
      console.log("On update post: ", postData.value.data.onUpdatePost);
  }});
  return listener;
}

export function onDeletePost() {
  const listener = API.graphql(graphqlOperation(subscriptions.onDeletePost))
    .subscribe({next: (postData) => {
      console.log("On delete post: ", postData.value.data.onDeletePost);
  }});
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
//     let answer = await createPost("user12345", "title12345", "description12345");
//     console.log("Create post: ", answer);
  
//     answer = await updatePost(answer.id, "titleUpdated", "descriptionUpdated");
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
            "phone_number": phone_number // "+18882223344"
          }
      });
      console.log({ user });
  } catch (error) {
      console.log('error signing up:', error);
  }
}

export async function resendConfirmationCode(email) {
  try {
      await Auth.resendSignUp(email);
      console.log('code resent succesfully');
  } catch (error) {
      console.log('error resending code: ', error);
  }
}


export async function confirmSignUp(email, code) {
  try {
    const user = await Auth.confirmSignUp(email, code);
    console.log({ user });
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}

export async function signIn(email, password) {
  try {
      const user = await Auth.signIn(email, password);
      console.log({ user });
  } catch (error) {
      console.log('error signing in', error);
  }
}

export async function signOut() {
  try {
    const user = await Auth.signOut();
    console.log({ user });
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

export async function changePassword(oldPassword, newPassword) {
  Auth.currentAuthenticatedUser()
  .then(user => {
      return Auth.changePassword(user, oldPassword, newPassword);
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
}

export async function forgotPassword(username) {
  Auth.forgotPassword(username)
  .then(data => console.log(data))
  .catch(err => console.log(err));
}

export async function forgotPasswordSubmit(username, code, new_password) {
  Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}


export async function currentAuthenticatedUser() {
  Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => console.log(user))
  .catch(err => console.log(err));
}

export async function updateUserAttributes(user, given_name, family_name) {
  await Auth.updateUserAttributes(user, {
    'given_name': given_name,
    'family_name': family_name
  });
}
