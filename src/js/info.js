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
    phonen = '' + post.userPhone;
}

function editHtml() {
    $(document).ready(function () {
        $('#firstLast').text(name);
        $("#phone").text(phonen);
    })
}

async function run() {
    id = getUrlVars().id;
    post = await aws.getPost(id);
    setVars();
    editHtml();
    setMap();
}

//map set-up
async function works(x, y) {
    const user = await aws.currentAuthenticatedUser();
    var mymap = L.map("mapid").setView([x, y], 13);
    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,' +
                ' <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
                '<a href="https://www.mapbox.com/">Mapbox</a>, Powered by <a href="https://www.esri.com/">Esri</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1Ijoidml0b3JpYXBvc3RhaW1hcnRpbnMiLCJhIjoiY2s5a2llYXM5MDZxaDNvbWt0YWd4NXE5NyJ9.4gJv-_McQLbJg3Gn4vUl7g",
        }
    ).addTo(mymap);

    var marker = L.marker([x, y]).addTo(mymap);
}

async function setMap() {
    const user = await aws.currentAuthenticatedUser();
    console.log(post);
    works(post.latitude, post.longitude);
}

run();