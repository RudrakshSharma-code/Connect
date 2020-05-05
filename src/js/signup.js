import * as aws from "./aws.js";


window.onload = function scripts () {
document.getElementById("confirmDiv").style.display = "none";
document.body.style.display = "block";
}

let signUpSubmit = document.getElementById("signUpSubmit");
signUpSubmit.addEventListener("click", signUp);

function signUp() {
    aws.signUp(
        document.getElementById("signUpEmail").value,
        document.getElementById("signUpPass").value,
        "+18882223344",
        document.getElementById("signUpFirst").value,
        document.getElementById("signUpLast").value,
    );
}

alert('Welcome to Connect!');
window.location.assign("profileSetup.html");

var prompter = confirm("Please check your e-mail. Enter your email and the sent code below");
if (prompter == true) {
  document.getElementById("thecontainer").style.display = "none";
  document.getElementById("confirmDiv").style.display = "block";
}


function confirmEmail() {
    aws.confirmSignUp(
        document.getElementById("confirmEmail").value,
        document.getElementById("confirmCode").value
    )
}   
let confirmButton = document.getElementById("confirmButton");
confirmButton.addEventListener("click", confirmEmail);