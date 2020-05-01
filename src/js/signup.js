import * as aws from "./aws.js";

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

function confirmEmail() {
    aws.confirmSignUp(
        document.getElementById("confirmEmail").value,
        document.getElementById("confirmCode").value
    )
}

let confirmButton = document.getElementById("confirmButton");
confirmButton.addEventListener("click", confirmEmail);