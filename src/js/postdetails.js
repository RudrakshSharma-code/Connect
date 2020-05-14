import * as aws from "./aws.js";
const user = aws.getUser();

var id;
var post;
var name;
var title;
var desc;
var phonen;
var volName;
var volPhone

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}

function setDesc(items){
  desc = "<ul>";
  console.log(items);
  let i;
  for (i = 0; i < items.length; i++){
    var item = items[i];
    desc += "<li>" + item + "</li>";
  }
  desc += "</ul>"
  return desc;
}

function setVars(){
  console.log("post: ", post)
  name = '' + post.userFirstName + " " + post.userLastName;
   title = post.title;
  desc = setDesc(post.items);
  console.log(desc);
  phonen = post.phone;
  if(post.volunteerID != null){
    volName = "Name: " + post.volunteerFirstName + post.volunteerLastName;
    volPhone = "Phone" + post.volunteerPhone;
  } else{
    volName = "No volunteer yet";
  }
  
  console.log(volName, volPhone)
  
}

function editHtml(){
  $(document).ready(function(){
    $('#name').text(name);
    $('#title').text(title);
    $('#description').html(desc);
    $("#volName").text(volName);
    $("#volPhone").text(volPhone);
  })
}

async function run(){
  id = getUrlVars().id;
  post = await aws.getPost(id);
  console.log(post.items)
  console.log(typeof(post.items))
  console.log(post.items.length)
  setVars();
  editHtml();
}

$("#contact").on("click", async function(){
  alert("Phone number: " + phonen);
  let volunteer = await user;

  post.volunteerID = volunteer.attributes.sub;
  post.volunteerFirstName = volunteer.attributes.given_name;
  post.volunteerLastName = volunteer.attributes.family_name;
  post.volunteerEmail = volunteer.attributes.email;
  post.volunteerPhone = volunteer.attributes.phone_number;

  aws.updatePost(post);
  console.log("here");
  
})
run();

async function signOut() {
  const user = await aws.currentAuthenticatedUser();
  if (user.attributes) {
    let check = confirm("Are you sure you want to log out?");
    if (check == true) {
      const user = await aws.currentAuthenticatedUser();
      user.signOut();
      setTimeout(function () {
        window.location.assign("index.html");
      }, 1000);
    } else {};
  } else {};
}

$('#contact').on('click', function() {
  location.replace("postdetails.html?id=" + this.post);
  //location.replace("info.html?id=");
})

window.onload = function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
}
