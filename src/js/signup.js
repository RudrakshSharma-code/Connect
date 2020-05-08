import * as aws from "./aws.js";


window.onload = function scripts() {
    document.getElementById("confirmDiv").style.display = "none";
    document.body.style.display = "block";
}

async function signUp() {
    let user = await aws.signUp(
        document.getElementById("signUpEmail").value,
        document.getElementById("signUpPass").value,
        "+18882223344",
        document.getElementById("signUpFirst").value,
        document.getElementById("signUpLast").value,
    );
    if (user.user) {
        console.log("Great success!")
        document.getElementById("thecontainer").style.display = "none";
        document.getElementById("confirmDiv").style.display = "block";
        setTimeout(function(){ window.location.assign("login.html"); }, 5000);
    } else {
        document.getElementById('error').innerHTML = user.message;
    }
    console.log(user);
}


let signUpSubmit = document.getElementById("signUpSubmit");
signUpSubmit.addEventListener("click", signUp);

document.getElementById("signUpPass").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        signUpSubmit.click();
    }
})