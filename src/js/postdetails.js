import { getPost } from "./aws";

var id;
var post;
var name;
var title;
var desc;
var phonen;

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
  name = '' + post.firstName + " " + post.lastName;
   title = post.title;
  desc = setDesc(post.items);
  console.log(desc);
  phonen = post.phone;
}

function editHtml(){
  $(document).ready(function(){
    $('#name').text(name);
    $('#title').text(title);
    $('#description').html(desc);
  })
}

async function run(){
  id = getUrlVars().id;
  post = await getPost(id);
  console.log(post.items)
  console.log(typeof(post.items))
  console.log(post.items.length)
  setVars();
  editHtml();
}

$("#contact").on("click", function(){
  alert("Phone number: " + phonen);
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

window.onload = function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
}
