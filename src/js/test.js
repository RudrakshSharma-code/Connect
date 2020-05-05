import * as aws from "./aws.js";

let signUpButton = document.getElementById("signUpButton");
signUpButton.addEventListener("click", signUp);

function signUp() {
    aws.signUp(
        document.getElementById("signUpEmail").value,
        document.getElementById("signUpPassword").value,
        "+18882223344",
        "given_name",
        "family_name"
    );
}

function confirmEmail() {
    aws.confirmSignUp(
        document.getElementById("confirmEmail").value,
        document.getElementById("confirmCode").value
    )
}

let confirmButton = document.getElementById("confirmButton");
confirmButton.addEventListener("click", confirmEmail);

function signIn() {
    aws.signIn(
        document.getElementById("signInEmail").value,
        document.getElementById("signInPassword").value,
    )

}
let signInButton = document.getElementById("signInButton");
signInButton.addEventListener("click", signIn);
