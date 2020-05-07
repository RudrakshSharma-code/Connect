import { createPost, currentAuthenticatedUser } from "./aws";

// type Post @model {
//   id: ID!
//   userID: String!
//   firstName: String!
//   lastName: String!
//   email: String!
//   phone: String!
//   title: String!
//   items: [String!]!
//   itemsCount: Int!
//   latitude: String!
//   longitude: String!
// }

var user;
var first;
var last;
var uEmail;
var uPhone;
var ptitle;
var pitems;
var pitemscount;
var latitude;
var longitude;

async function setVars() {
  let pitems;
  let pitemscount;

  let user = await currentAuthenticatedUser({
    bypassCache: true,
  })
    .then((user) => console.log((user = user.attributes.sub)))
    .catch((err) => console.log("error: ", err));
  return user;
}

async function post() {

  let user = await currentAuthenticatedUser({
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
    userID: uid,
    firstName: first,
    lastName: last,
    email: uEmail,
    phone: uPhone,
    title: ptitle,
    items: pitems,
    itemsCount: pitemscount,
    latitude: ulatitude,
    longitude: ulongitude,
  };
  createPost(post);
}

$("#submit").on("click", post);
