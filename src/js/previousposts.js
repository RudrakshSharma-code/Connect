import { currentAuthenticatedUser, getUser, listPosts } from "./aws";
import { selectInput } from "aws-amplify";

// let user = getUser();

var user;
var username;
var posts = [];

async function setVars() {
  user = await currentAuthenticatedUser({
    bypassCache: true,
  });
  username = user.attributes.sub;
  posts = await listPosts({ userID: { eq: username } });
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
    <p class="posted">Posted 3 hours ago</p>
    </div>`;
    $("main").append(card);
}

function setHtml() {
  posts.forEach(function (post) {
    createCard(post.id);
    let card = $("#post_" + post.id + " .title");
    $("#post_" + post.id + " .title").text(post.title);
    card.on("click", function(){
      location.replace("prevreq.html?id=" + post.id);
    })
    let status =  (post.volunteerID == null) ?
                  "pending" :
                  "complete"
    $("#post_" + post.id + " .status").text(status);
  });
}

$(document).ready(function () {
  setVars().then(function () {
    setHtml();
  })
  
});