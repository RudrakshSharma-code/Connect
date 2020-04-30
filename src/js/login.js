import "./aws.js";
import { Auth } from 'aws-amplify';

const signInButton = document.getElementById('signInButton');
signInButton.addEventListener('click', signIn);

async function signIn() {
  try {
    const user = await Auth.signIn(
      document.getElementById('signInEmail').value,
      document.getElementById('signInPass').value,
    );
    console.log({
      user
    });
  } catch (error) {
    console.log('error signing in', error);
  }
}