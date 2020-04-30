import * as aws from "./aws.js";

function signIn() {
  aws.signIn(
      document.getElementById("signInEmail").value, 
      document.getElementById("signInPass").value,
  )
  
}
let signInButton = document.getElementById("signInButton");
signInButton.addEventListener("click", signIn);
