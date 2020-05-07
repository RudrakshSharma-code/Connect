import * as aws from "./aws.js";

$(document).ready(function () {
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