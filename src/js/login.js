import * as aws from "./aws.js";

window.onload = function () {
  document.getElementById("passwordDiv").style.display = "none";
  document.getElementById("recoverDiv").style.display = "none";
  document.body.style.display = "block";
}

function signIn() {
  aws.signIn(
    document.getElementById("signInEmail").value,
    document.getElementById("signInPass").value,
  )
}
let signInButton = document.getElementById("signInButton");
signInButton.addEventListener("click", signIn);


function showPass() {
  document.getElementById("thecontainer").style.display = "none";
  document.getElementById("passwordDiv").style.display = "block";
}
let forgotLink = document.getElementById("forgotten");
forgotLink.addEventListener("click", showPass);


function forgotPassword() {
  document.getElementById("recoverDiv").style.display = "block";
  document.getElementById("passwordDiv").style.display = "none";
  aws.forgotPassword(
      document.getElementById('forgotEmail').value,
    )
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
let confirmButton = document.getElementById("sendCode");
confirmButton.addEventListener("click", forgotPassword);


function forgotPasswordSubmit() {
  alert('Welcome back to Connect!');
  window.location.assign("home.html");
  aws.forgotPasswordSubmit(
      document.getElementById('recoverEmail').value,
      document.getElementById('recoverCode').value,
      document.getElementById('recoverPass').value,
    )
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
let recoverButton = document.getElementById("recoverButton");
recoverButton.addEventListener("click", forgotPasswordSubmit);