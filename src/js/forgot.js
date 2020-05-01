import * as aws from "./aws.js";


function forgotPassword() {
    aws.forgotPassword(
            document.getElementById('signInEmail').value,
        )
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

let confirmButton = document.getElementById("signInButton");
confirmButton.addEventListener("click", forgotPassword);