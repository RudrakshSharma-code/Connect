import { listPosts, getUser, currentAuthenticatedUser } from "./aws";

// import * as aws from "./aws.js";
const user = getUser();


var mymap = mymap = L.map("mapid");
var markers = [];

function buildMap(x, y){
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

function onPopupClick() {
  var data = this._popup._content;
  console.log(this.post);
  var description = this.post.items;
  location.replace("postdetails.html?id=" + this.post.id);
}

async function setMarkers(posts) {
  for (let key in posts) {
    var post = posts[key];
    var title = post.title;
    var user = post.user;
    var mes = "<b>" + user + " </b><br>" + title;
    var marker = new L.marker([post.latitude, post.longitude]).addTo(mymap);
    console.log("adding");
    markers.push(marker);
    marker.bindPopup(mes);
    marker.on("click", onPopupClick);
    marker.post = post;
    console.log(marker);
  }
}

function addCircle(x, y){
  var circle = L.circle([x, y], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 1500,
  }).addTo(mymap);
}

function works(x, y, posts) {
  buildMap(x, y);
  setMarkers(posts);
  addCircle(x, y);
  
}

async function setMap(posts) {
  let user = await currentAuthenticatedUser({
    bypassCache: true,
  });
  console.log(user);
  var ulatitude = user.attributes["custom:latitude"];
  var ulongitude = user.attributes["custom:longitude"];
  works(ulatitude, ulongitude, posts);
}

async function start() {
  var posts = await listPosts();
  setMap(posts);
  removeMars();
  
}

function setSlider() {
  var slider = document.getElementById("slider1");
  var output = document.getElementById("output");
  output.innerHTML = slider.value;

  var value = slider.value;

  slider.oninput = function () {
    value = Number(this.value);
    output.innerHTML = value;
    sliderFilter(this.value)
  };
  return value;
}

async function sliderFilter(max) {
  let keys = "" + ($("#searchBar").val());
  let posts;
  max = Number(max)
  if(keys == ""){
    posts = await listPosts(  {  itemsCount: {le: max}  }  );
  } else{
    posts = await listPosts(  {  items:{contains:keys}, itemsCount: {le: max}  }  );
  }
  updateMap(posts);
}

function removeMars(){
    for(let i = 0; i < markers.length; i++){
      //mymap.removeLayer(markers[i]);
      markers[i].remove();
      //never ever modify the array that you are looping though that
    }
    markers = [];
}


async function updateMap(posts) {
  removeMars();
  for (let key in posts) {
    console.log(posts);
    var post = posts[key];
    var title = post.title;
    var user = post.user;
    var mes = "<b>" + user + " </b><br>" + title;
    var marker = new L.marker([post.latitude, post.longitude]).addTo(mymap);
    marker.bindPopup(mes);
    marker.on("click", function(){
        console.log(this.post);
        alert(this.post);
        var description = this.post.items;
        location.replace("postdetails.html?id=" + this.post.id);
    });
    
    marker.post = post;
    markers.push(marker);
  }
  
}

async function signOut() {
  const user = await aws.currentAuthenticatedUser();
  if (user.attributes) {
    let check = confirm("Are you sure you want to log out?");
    if (check == true) {
      const user = await aws.currentAuthenticatedUser();
      user.signOut();
      setTimeout(function () {
        window.location.assign("index.html");
      }, 1000);
    } else {
    }
  } else {
  }
}

$(document).ready(function () {
  start();
  setSlider();
  setSearch();
});

window.onload = function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
};

function setSearch(){
  var value = "";
  $("#button-addon3").on("click", function(){
    value = $("#searchBar").val();
    if(value == undefined){
      value = "";
    }
    searchFilter(value)
  })
  return value;
}

async function searchFilter(item){
  let posts;
  let max = setSlider();
  if(item == "" || item == null){
    posts = await listPosts(  {  itemsCount: {le: max}  }  )
  } else{
    console.log(item, max)
    posts = await listPosts(  {  items:{contains:item}, itemsCount: {le: max}  }  )
  }
  updateMap(posts);  
}