////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////

async function createNewPost(user, title, description) {
  const post = {"user": user, "title": title, "description": description};
  return await API.graphql(graphqlOperation(createPost, { "input": post }))
}


API.graphql(graphqlOperation(onCreatePost)).subscribe({
  next: (evt) =>{
    const post = evt.value.data.onCreatePost;
    console.log(post);
  }
});

async function getAllPosts() {
  API.graphql(graphqlOperation(listPosts)).then((evt) => {
    evt.data.listPosts.items.map((post, i) => console.log(post));
  })
}


async function signUp(email, password, phone_number) {
  try {
      const user = await Auth.signUp({
          "username": email,
          "password": password,
          "attributes": {
              "phone_number": phone_number // "+18882223344"
              // other custom attributes
          }
      });
      console.log({ user });
  } catch (error) {
      console.log('error signing up:', error);
  }
}


async function confirmSignUp(email, code) {
  try {
    const user = await Auth.confirmSignUp(email, code);
    console.log({ user });
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}

async function signIn(email, password) {
  try {
      const user = await Auth.signIn(email, password);
      console.log({ user });
  } catch (error) {
      console.log('error signing in', error);
  }
}

async function signOut() {
  try {
    const user = await Auth.signOut();
    console.log({ user });
  } catch (error) {
      console.log('error signing out: ', error);
  }
}
