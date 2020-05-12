import { listPosts, getUser, currentAuthenticatedUser } from "./aws";

let user = getUser();

// MAP SETUP

var mymap = (mymap = L.map("mapid"));
var markers = [];

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

function addCircle(x, y) {
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
}

//FILTERS

function removeMars() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].remove();
  }
  markers = [];
}

async function updateMap(posts) {
  removeMars();
  for (let key in posts) {
    var post = posts[key];
    var title = post.title;
    var user = post.user;
    var mes = "<b>" + user + " </b><br>" + title;
    var marker = new L.marker([post.latitude, post.longitude]).addTo(mymap);
    marker.bindPopup(mes);
    marker.on("click", function () {
      alert(this.post);
      location.replace("postdetails.html?id=" + this.post.id);
    });
    marker.post = post;
    markers.push(marker);
  }
}

function setSlider() {
  var slider = document.getElementById("slider1");
  var output = document.getElementById("output");
  output.innerHTML = slider.value;
  var value = Number(slider.value);

  slider.oninput = function () {
    value = Number(this.value);
    output.innerHTML = value;
    sliderFilter(value);
  };
  return Number(value);
}

async function sliderFilter(max) {
  let keys = "" + $("#searchBar").val().trim();
  let posts =
    keys == ""
      ? await listPosts({ itemsCount: { le: max } })
      : await listPosts({ items: { contains: keys }, itemsCount: { le: max } });
  updateMap(posts);
}

function setSearch() {
  var value = "";
  $("#button-addon3").on("click", function () {
    value = $("#searchBar").val().trim();
    searchFilter(value);
  });
  return value;
}

async function searchFilter(item) {
  let max = setSlider();
  let posts =
    item == "" || item == null
      ? await listPosts({ itemsCount: { le: max } })
      : await listPosts({ items: { contains: item }, itemsCount: { le: max } });
  updateMap(posts);
}

//AUTH

async function signOut() {
  const user = await currentAuthenticatedUser();
  if (user.attributes) {
    let check = confirm("Are you sure you want to log out?");
    if (check == true) {
      const user = await currentAuthenticatedUser();
      user.signOut();
      setTimeout(function () {
        window.location.assign("index.html");
      }, 1000);
    } else {
    }
  } else {
  }
}

window.onload = function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
};

//CALLS

$(document).ready(function () {
  start();
  setSlider();
  setSearch();
});
