import { listPosts, createPost } from "./aws.js"

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

async function showPosts(){
    var posts = await listPosts();
    for (let key in posts) {
        var post = posts[key];
        console.log(post);
        var title = "<bold>TITLE: " + post.title + "</br>";
        var user = " USER: " + post.user + "</br>";
        var desc = "DESCRIPTION: " + post.description + "</br></p>";
        var div = "<div id =" + key + ">"+title + user + "</div>"
        $("#requests").append(div);
        $("#"+key).click(
            function(){
                var a =confirm("Description: " + posts[key].description);
                if(a){
                    alert("phone number: 123 456 7890");
                }
            }
        );

    }
}

function handle(){
}
showPosts();


