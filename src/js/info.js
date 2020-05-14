import * as aws from "./aws.js";
const user = aws.getUser();

var id;
var post;
var name;
var phonen;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
        m,
        key,
        value
    ) {
        vars[key] = value;
    });
    return vars;
}

function setVars() {
    console.log("post: ", post)
    name = '' + post.userFirstName + " " + post.userLastName;
    phonen = post.phone;
}

function editHtml() {
    $(document).ready(function () {
        $('#firstLast').text(name);
        $("#phone").text(phone);
    })
}

async function run() {
    id = getUrlVars().id;
    post = await aws.getPost(id);
    setVars();
    editHtml();
}