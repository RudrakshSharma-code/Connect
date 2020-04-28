///////////////////////////////////////////////////////////////////////////////
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createPost } from '../graphql/mutations'
import { listPosts } from '../graphql/queries'
import { onCreatePost } from '../graphql/subscriptions'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
API.configure(awsconfig);
PubSub.configure(awsconfig);
Amplify.configure(awsconfig);
///////////////////////////////////////////////////////////////////////////////

// add post
const createNewPostButton = document.getElementById('createNewPostButton');

createNewPostButton.addEventListener('click', (evt) => {
  createNewPost().then( (evt) => {console.log(evt.data);})
});

async function createNewPost() {
  const post = { user: "userID", title: document.getElementById("newPostTitle").value , description: document.getElementById("newPostDescription").value}
  return await API.graphql(graphqlOperation(createPost, { input: post }))
}

// get new post
const newPostContainer = document.getElementById('newPostContainer');

API.graphql(graphqlOperation(onCreatePost)).subscribe({
  next: (evt) =>{
    newPostContainer.innerHTML = `New post:`;
    const post = evt.value.data.onCreatePost;
    newPostContainer.innerHTML += `<p>${post.user} - ${post.title} - ${post.description}</p>`;
  }
});

// get all posts
const allPostsContainer = document.getElementById('allPostsContainer');

async function getAllPosts() {
  allPostsContainer.innerHTML = `Posts:`;
  API.graphql(graphqlOperation(listPosts)).then((evt) => {
    evt.data.listPosts.items.map((post, i) => 
        allPostsContainer.innerHTML += `<p>${post.user} - ${post.title} - ${post.description}</p>`
    );
  })
}

getAllPosts();


// sign up
const signUpButton = document.getElementById('signUpButton');
signUpButton.addEventListener('click', signUp);

async function signUp() {
  try {
      const user = await Auth.signUp({
          username: document.getElementById('signUpEmail').value,
          password: document.getElementById('signUpPassword').value,
          attributes: {
              // phone_number: "+18882223344",   // optional - E.164 number convention
              // other custom attributes 
          }
      });
      console.log({ user });
  } catch (error) {
      console.log('error signing up:', error);
  }
}

// confirm sign up
const confirmButton = document.getElementById('confirmButton');
confirmButton.addEventListener('click', confirmSignUp);

async function confirmSignUp() {
  try {
    const user = await Auth.confirmSignUp(document.getElementById('confirmEmail').value, document.getElementById('confirmCode').value);
    console.log({ user });
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}

// sign in
const signInButton = document.getElementById('signInButton');
signInButton.addEventListener('click', signIn);

async function signIn() {
  try {
      const user = await Auth.signIn(
        document.getElementById('signInEmail').value,
        document.getElementById('signInPassword').value,
      );
      console.log({ user });
  } catch (error) {
      console.log('error signing in', error);
  }
}


//sign out
const signOutButton = document.getElementById('signOutButton');
signOutButton.addEventListener('click', signOut);

async function signOut() {
  try {
    const user = await Auth.signOut();
    console.log({ user });
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

