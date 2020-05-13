import * as aws from "./aws.js";
const user = aws.getUser();

async function changeHtml(){
  let u = await user;
  $("#firstLast").text(u.attributes.given_name + " " + u.attributes.family_name);
  $("#number").text(u.attributes.phone_number);
  $("#email").text(u.attributes.email);

  let posts = await aws.listPosts({userID: {eq: u.attributes.sub}});
  console.log(posts);
  
}

function setButton(){
  $("#posts").on("click", function(){
    location.replace("previousposts.html");
  })
}

// MAP

var mymap

async function setMap() {
  mymap = (mymap = L.map("mapid"));
  let u = await user;
  var ulatitude = u.attributes["custom:latitude"];
  var ulongitude = u.attributes["custom:longitude"];
  works(ulatitude, ulongitude);
}

function works(x, y) {
  buildMap(x, y);
  addMarker(x, y);
}


function buildMap(x, y) {
  mymap.setView([x, y], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1Ijoidml0b3JpYXBvc3RhaW1hcnRpbnMiLCJhIjoiY2s5a2llYXM5MDZxaDNvbWt0YWd4NXE5NyJ9.4gJv-_McQLbJg3Gn4vUl7g",
    }
  ).addTo(mymap);
}

function addMarker(x, y){
  var marker = new L.marker([x, y]).addTo(mymap)
}




//DELETTE

async function deletePost(id) {
  return await aws.deletePost(id);
}

//START

$(document).ready(function(){
  changeHtml();
  setMap();
  setButton();
})


