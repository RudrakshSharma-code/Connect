import { createPost } from "./aws";



function post(){
    // $(document).ready(function(){
        var form = $("#post");
        // $("#submit").on("click", function(){
            var user = $("#user").val();
            console.log(user);
            var title = $("#title").val();
            var desc = $("#description").val();
            
            // alert(user + title + desc);
        createPost(user, title, desc);
        // console.log("called");
        // });
    // })
}

$("#submit").on("click", post);

