import { listPosts, currentAuthenticatedUser } from "./aws";

async function changeHtml(){
    let user = await currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log(user);
      let uid = user.attributes.sub;
      console.log(user);
      let name = user.attributes.given_name + " ";
      name += user.attributes.family_name;
      $("#firstLast").text(name);
}

changeHtml();