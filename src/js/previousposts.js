import {
  currentAuthenticatedUser,
  getUser,
  listPosts,
  Auth,
} from "./aws";
import {
  selectInput
} from "aws-amplify";

let user1 = getUser();

var user;
var username;
var posts = [];

async function setVars() {
  user = await currentAuthenticatedUser({
    bypassCache: true,
  });
  username = user.attributes.sub;
  posts = await listPosts({
    userID: {
      eq: username
    }
  });
  console.log(posts);
}

function createCard(id) {
  let card = `<div class="cards" id="post_`;
  card +=
    id +
    `">
    <div class="row">
      <span class="title">Title</span>
       <span class="status">status</span>
    </div>
    <span class="posted">Posted 3 hours ago</span>
    </div>`;
  $("main").append(card);
}

function setHtml() {
  posts.forEach(function (post) {
    console.log(post);
    createCard(post.id);
    let card = $("#post_" + post.id + " .title");
    $("#post_" + post.id + " .title").text(post.title);
    card.on("click", function () {
      location.replace("prevreq.html?id=" + post.id);
    })
    let status = (post.volunteerID == null) ?
      "pending" :
      "complete";
    let date = post.time;
    $("#post_" + post.id + " .status").text(status);
    $("#post_" + post.id + " .posted").text("Posted on " + date);
  });
}

$(document).ready(function () {
  nullFix();
  setVars().then(function () {
    setHtml();
  })

});

async function signOut() {
  user = await currentAuthenticatedUser();
  if (user.attributes) {
    let check = confirm("Are you sure you want to log out?");
    if (check == true) {
      const user = await currentAuthenticatedUser();
      user.signOut();
      setTimeout(function () {
        window.location.assign("index.html");
      }, 1000);
    } else {};
  } else {};
}

function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
}