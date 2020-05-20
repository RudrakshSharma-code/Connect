// type Post @model {
//   id: ID!
//   title: String!
//   items: [String!]!
//   itemsCount: Int!
//   latitude: String!
//   longitude: String!

//   userID: String!
//   userFirstName: String!
//   userLastName: String!
//   userEmail: String!
//   userPhone: String!

//   volunteerID: String
//   volunteerFirstName: String
//   volunteerLastName: String
//   volunteerEmail: String
//   volunteerPhone: String
// }

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

export async function createPost(post) {
  const answer = await API.graphql(graphqlOperation(mutations.createPost, {
    "input": post,
    "condition": null
  }));
  return answer.data.createPost;
}

export async function updatePost(post) {
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
  // filter by user= {userID: {eq: "userID"}};
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

//   let post = {
//     title: "title",
//     items: ["toilet paper", "vodka"],
//     itemsCount: 2,
//     latitude: "49.2510",
//     longitude: "-123.0010",

//     userID: "userID",
//     userFirstName: "userFirstName",
//     userLastName: "userLastName",
//     userEmail: "userEmail",
//     userPhone: "userPhone",

//     volunteerID: null,
//     volunteerFirstName: null,
//     volunteerLastName: null,
//     volunteerEmail: null,
//     volunteerPhone: null,
//   }

//   setTimeout(async () => {
//    let answer = await createPost(post);
//    console.log("Create post: ", answer);

//     post.id = answer.id;
//     post.items = ["item100", "item200"];

//     answer = await updatePost(post);
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
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: true
    });
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
    const answer = await Auth.updateUserAttributes(user, {
      'given_name': given_name,
      'family_name': family_name
    });
    return answer;
  } catch (error) {
    return error;
  }

}

export async function updateUserPhone(user, phone_number) {
  try {
    const answer = await Auth.updateUserAttributes(user, {
      'phone_number': phone_number
    });
    return answer;
  } catch (error) {
    return error;
  }
}

export async function updateUserCoordinates(user, latitude, longitude) {
  try {
    const answer = await Auth.updateUserAttributes(user, {
      'custom:latitude': latitude,
      'custom:longitude': longitude
    });
    return answer;
  } catch (error) {
    return error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getUser() {
  const user = await currentAuthenticatedUser();
  const path = window.location.pathname;
  const allowed = ["/", "/index.html", "/login.html", "/signup.html", "/aboutUs.html"]

  console.log("path:", path);

  if (user !== "not authenticated" && allowed.includes(path)) {
    window.location.replace('/home.html');
  }

  if (user === "not authenticated" && !allowed.includes(path)) {
    window.location.replace('/login.html');
  }

  // window.onload = () => { document.body.style.display = "block"; }
  return user;
}