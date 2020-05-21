import * as aws from "./aws.js";
const user = aws.getUser();

async function signOut() {
    const user = await aws.currentAuthenticatedUser();
    if (user.attributes) {
        let check = confirm("Are you sure you want to log out?");
        if (check == true) {
            const user = await aws.currentAuthenticatedUser();
            user.signOut();
            setTimeout(function () {
                window.location.assign("index.html");
            }, 1000);
        } else {};
    } else {};
}


$(document).ready(function () {
    nullFix();
})

function nullFix() {
    document.getElementById("logout").addEventListener("click", signOut);
}