import "./aws.js";
import { Auth } from 'aws-amplify';

const signUpSubmit = document.getElementById('signUpSubmit');
signUpSubmit.addEventListener('click', signUp);

async function signUp() {
    try {
        const user = await Auth.signUp({
            username: document.getElementById('signUpEmail').value,
            password: document.getElementById('signUpPass').value,
            attributes: {
                //"phone_number": phone_number // "+18882223344"
                // other custom attributes
            }
        });
        console.log({
            user
        });
    } catch (error) {
        console.log('error signing up:', error);
    }
}


const confirmButton = document.getElementById('confirmButton');
confirmButton.addEventListener('click', confirmSignUp);

async function confirmSignUp() {
  try {
    const user = await Auth.confirmSignUp(document.getElementById('confirmEmail').value, document.getElementById('confirmCode').value);
    console.log({ user });
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}