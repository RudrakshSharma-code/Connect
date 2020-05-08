import { listPosts } from "./aws";

async function changeHtml(){
    let user = await currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log(user);
      let uid = user.attributes.sub;
      console.log(user);
}

changeHtml();