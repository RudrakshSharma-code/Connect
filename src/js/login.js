import * as aws from "./aws.js";
const user = aws.getUser();

document.getElementById("passwordDiv").style.display = "none";
document.getElementById("recoverDiv").style.display = "none";
document.body.style.display = "block"

//sign in function
async function signIn() {
  let user = await aws.signIn(
    document.getElementById("signInEmail").value,
    document.getElementById("signInPass").value,
  )
  if (user.username) {
    console.log(user);
    currentSession();
    currentAuthenticatedUser();
    hidePass();
    redirect();
    document.getElementById('error').style.display = "none";
  } else {
    document.getElementById('error').innerHTML = user.message;
  }
}

//enter key press and on click activation
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

//welcome and redirect function
function hidePass() {
  let x = document.getElementsByClassName("form-group");
  let i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  document.getElementById("forgotten").style.display = 'none';
  document.getElementById("notmember").style.display = 'none';
}

async function redirect() {
  const user = await aws.currentAuthenticatedUser();
  if (user.attributes['custom:latitude'] == '48.8566' && user.attributes['custom:longitude'] == '2.3522') {
    document.getElementById('heady').innerHTML = "Welcome, " + user.attributes.given_name + "! Redirecting...";
    setTimeout(function () {
      window.location.assign("profileSetup.html");
    }, 3000);
  } else {
    document.getElementById('heady').innerHTML = "Welcome back, " + user.attributes.given_name + "! Redirecting...";
    setTimeout(function () {
      window.location.assign("home.html");
    }, 3000);
  }
}

//forgotten password reset functions
async function forgotPassword() {
  let answer = await aws.forgotPassword(
    document.getElementById('forgotEmail').value,
  )
  if (answer.message != undefined) {
    document.getElementById('forgotError').innerHTML = answer.message;
  } else {
    document.getElementById("recoverDiv").style.display = "block";
    document.getElementById("passwordDiv").style.display = "none";
  }
}
let confirmButton = document.getElementById("sendCode");
confirmButton.addEventListener("click", forgotPassword);


async function forgotPasswordSubmit() {
  document.getElementById("passwordDiv").style.display = "none";
  let answer = await aws.forgotPasswordSubmit(
    document.getElementById('recoverEmail').value,
    document.getElementById('recoverCode').value,
    document.getElementById('recoverPass').value,
  )
  location.reload();
}
let recoverButton = document.getElementById("recoverButton");
recoverButton.addEventListener("click", forgotPasswordSubmit);

//functions to check current user and session
async function currentAuthenticatedUser() {
  let user = await aws.currentAuthenticatedUser({
      bypassCache: true
    })
    .then(user => console.log(user))
    .catch(err => console.log(err));
}

async function currentSession() {
  let user = await aws.currentSession()
    .then(user => console.log(user))
    .catch(err => console.log(err));
}