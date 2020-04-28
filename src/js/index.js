import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createPost } from '../graphql/mutations'
import { listPosts } from '../graphql/queries'
import { onCreatePost } from '../graphql/subscriptions'

import awsconfig from './aws-exports';
API.configure(awsconfig);
PubSub.configure(awsconfig);

async function createNewPost() {
  const post = { user: "userID", title: "I need help!" , description: "Some long description."}
  return await API.graphql(graphqlOperation(createPost, { input: post }))
}


// add post
const createNewPostButton = document.getElementById('createNewPostButton');

createNewPostButton.addEventListener('click', (evt) => {
  createNewPost().then( (evt) => {console.log(evt.data);})
});

// new post
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



