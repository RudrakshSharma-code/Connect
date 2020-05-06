import * as aws from "./aws.js";

window.onload = function () {
  document.getElementById("passwordDiv").style.display = "none";
  document.getElementById("recoverDiv").style.display = "none";
  document.body.style.display = "block";
}

//sign up function
async function signIn() {
  let user = await aws.signIn(
    document.getElementById("signInEmail").value,
    document.getElementById("signInPass").value,
  )
  if (user.username != null) {
    window.location.assign("home.html");
  } else {
    document.getElementById('error').innerHTML = user.message;
  }
  console.log(user);
}
let signInButton = document.getElementById("signInButton");
signInButton.addEventListener("click", signIn);

document.getElementById("signInPass").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    signInButton.click();
  }
})

function showPass() {
  document.getElementById("thecontainer").style.display = "none";
  document.getElementById("passwordDiv").style.display = "block";
}
let forgotLink = document.getElementById("forgotten");
forgotLink.addEventListener("click", showPass);


async function forgotPassword() {
  let answer = await aws.forgotPassword(
      document.getElementById('forgotEmail').value,
    )    
    if (answer.message != undefined) {
    document.getElementById('forgotError').innerHTML = answer.message;
    }
    else {
      document.getElementById("recoverDiv").style.display = "block";
      document.getElementById("passwordDiv").style.display = "block";
    }
}
let confirmButton = document.getElementById("sendCode");
confirmButton.addEventListener("click", forgotPassword);


async function forgotPasswordSubmit() {
  let user = await aws.forgotPasswordSubmit(
      document.getElementById('recoverEmail').value,
      document.getElementById('recoverCode').value,
      document.getElementById('recoverPass').value,
    )
}
let recoverButton = document.getElementById("recoverButton");
recoverButton.addEventListener("click", forgotPasswordSubmit);