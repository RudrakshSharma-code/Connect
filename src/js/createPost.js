import * as aws from "./aws.js";

const user = aws.getUser();

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

// add row
$("#addRow").click(function () {
  var html = "";
  html += '<div id="inputFormRow">';
  html += '<div class="input-group mb-3">';
  html +=
    '<input type="text" name="item" class="item form-control m-input" placeholder="Enter an item or request..." autocomplete="off">';
  html += '<div class="input-group-append">';
  html += '<button id="removeRow" type="button" >Remove</button>';
  html += "</div>";
  html += "</div>";

  $("#newRow").append(html);
});

// remove row
$(document).on("click", "#removeRow", function () {
  $(this).closest("#inputFormRow").remove();
});

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
    pitems.push($(this).val().trim().toLowerCase());
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

async function setHtml() {
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

$(document).ready(function () {
  nullFix();
})

function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
}