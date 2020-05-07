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
  let ptitle;
  let pitems;
  let pitemscount;
  let latitude;
  let longitude;
}

post();
$("#submit").on("click", post);
