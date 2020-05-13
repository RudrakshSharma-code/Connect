import * as aws from "./aws.js";
const user = aws.getUser();

async function changeHtml(){
    let user = await aws.currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log(user);
      let uid = user.attributes.sub;
      console.log(user);
      let name = user.attributes.given_name + " ";
      name += user.attributes.family_name;
      $("#firstLast").text(name);
      $("#number").text(user.attributes.phone_number)
}

$(document).ready(function(){
  changeHtml();
})

