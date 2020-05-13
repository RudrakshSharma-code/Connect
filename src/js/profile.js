import * as aws from "./aws.js";
const user = aws.getUser();

async function changeHtml(){
  let u = await user;
  $("#firstLast").text(u.attributes.given_name + " " + u.attributes.family_name);
  $("#number").text(u.attributes.phone_number);
  $("#email").text(u.attributes.email);

  let posts = await aws.listPosts({userID: {eq: u.attributes.sub}});
  console.log(posts);
  
}

function setButton(){
  $("#posts").on("click", function(){
    location.replace("previousposts.html");
  })
}

async function deletePost(id) {
  return await aws.deletePost(id);
}

$(document).ready(function(){
  changeHtml();
  setButton();
})

