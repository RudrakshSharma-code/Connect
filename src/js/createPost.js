import * as aws from "./aws.js";

const user = aws.getUser();


2
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

// type Post @model {
  // id: ID!
  // title: String!
  // items: [String!]!
  // itemsCount: Int!
  // latitude: String!
  // longitude: String!
  // time: String!

  // userID: String!
  // userFirstName: String!
  // userLastName: String!
  // userEmail: String!
  // userPhone: String!

  // volunteerID: String
  // volunteerFirstName: String
  // volunteerLastName: String
  // volunteerEmail: String
  // volunteerPhone: String
// }


async function setVars() {
  let pitems;
  let pitemscount;

  let user = await aws.currentAuthenticatedUser({
    bypassCache: true,
  })
    .then((user) => console.log((user = user.attributes.sub)))
    .catch((err) => console.log("error: ", err));
  return user;

  

}

async function post() {

  let user = await aws.currentAuthenticatedUser({
    bypassCache: true,
  });
  console.log(user);
  let uid = user.attributes.sub;
  let first = user.attributes.given_name;
  let last = user.attributes.family_name;
  let uEmail = user.attributes.email;
  let uPhone = user.attributes.phone_number;
  let ptitle = $("#title").val();
  let pitems = [];
  $("input[name='item']").each(function () {
    pitems.push($(this).val());
  });
    let pitemscount = pitems.length;
  let ulatitude = user.attributes["custom:latitude"];
  let ulongitude = user.attributes["custom:longitude"];
  let post = {
    title: ptitle,
    items: pitems,
    itemsCount: pitemscount,
    latitude: ulatitude,
    longitude: ulongitude,
    time: date,
  
    userID: uid,
    userFirstName: first,
    userLastName: last,
    userEmail: uEmail,
    userPhone: uPhone
  };
  await aws.createPost(post);
  location.replace("confirmation.html");
}

async function setHtml(){
  let user = await aws.currentAuthenticatedUser({
    bypassCache: true,
  });
  console.log(user);
  let first = user.attributes.given_name;
  let last = user.attributes.family_name;
  let name = "" + first + " " + last;
  $("#name").text(name);
}

setHtml();
$("#submit").on("click", post);

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

