import * as aws from "./aws.js";
const user = aws.getUser();

$(document).ready(function () {
  nullFix();
  currentAuthenticatedUser()
  $("#volunteer.card").click(function () {
    $(this).css("color", "red");
    window.location.href = "index.html";
  });
})

async function currentAuthenticatedUser() {
  let user = await aws.currentAuthenticatedUser({
      bypassCache: true
    })
    .then(user => document.getElementById("homeH1").innerHTML = "What would you like to do " + user.attributes.given_name + "?")
    .catch(err => console.log(err));
}

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

function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
}