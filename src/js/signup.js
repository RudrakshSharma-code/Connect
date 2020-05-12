import * as aws from "./aws.js";
const user = aws.getUser();
let signUpPass = document.getElementById("signUpPass")


window.onload = function scripts() {
    document.getElementById("confirmDiv").style.display = "none";
    document.body.style.display = "block";
    document.getElementById("prompt").style.display = "none";
    document.getElementById("show").style.display = "none";
}

async function signUp() {
    let user = await aws.signUp(
        document.getElementById("signUpEmail").value,
        signUpPass.value,
        "+1" + document.getElementById("signUpPhone").value,
        document.getElementById("signUpFirst").value,
        document.getElementById("signUpLast").value,
    );
    if (user.user) {
        console.log("Great success!")
        document.getElementById("thecontainer").style.display = "none";
        document.getElementById("confirmDiv").style.display = "block";
        setTimeout(function () {
            window.location.assign("login.html");
        }, 6000);
    } else {
        document.getElementById('error').innerHTML = user.message;
    }
    console.log(user);
}

let signUpSubmit = document.getElementById("signUpSubmit");
signUpSubmit.addEventListener("click", signUp);

signUpPass.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        signUpSubmit.click();
    }
})

signUpPass.addEventListener("mouseover", function (event) {
    document.getElementById("prompt").style.display = "inline";
    document.getElementById("show").style.display = "inline";
    document.getElementById("signUpSubmit").style.marginTop = "0%";
    document.getElementById("show").style.top = "20%";
})

signUpPass.addEventListener("mouseleave", function (event) {
    document.getElementById("prompt").style.display = "none";
    document.getElementById("signUpSubmit").style.marginTop = "20%";
    document.getElementById("show").style.top = "45%";
})

document.getElementById("show").addEventListener("click", function (event) {
    if (signUpPass.type === "password") {
        signUpPass.type = "text";
        document.getElementById("show").innerHTML = "hide";
    } else {
        signUpPass.type = "password";
        document.getElementById("show").innerHTML = "show";
    }
});