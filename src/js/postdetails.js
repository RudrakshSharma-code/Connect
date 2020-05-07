import { getPost } from "./aws";

var id;
var post;
var name;
var title;
var desc;

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
  name = post.user;
  title = post.title;
  desc = setDesc(post.items);
  console.log(desc);
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


run();