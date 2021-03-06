import * as aws from "./aws.js";
const user = aws.getUser();

function works(x, y) {
  var mymap = L.map("mapid").setView([x, y], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: "pk.eyJ1Ijoidml0b3JpYXBvc3RhaW1hcnRpbnMiLCJhIjoiY2s5a2llYXM5MDZxaDNvbWt0YWd4NXE5NyJ9.4gJv-_McQLbJg3Gn4vUl7g",
    }
  ).addTo(mymap);

  var marker = L.marker([x, y]).addTo(mymap);
  // marker
  //   // .bindPopup("<b>First Last</b><br>Groceries needed   ")
  //   // .bindPopup("Youre here!")
  //   .openPopup();

  // function onPopupClick() {
  //     var data = marker._popup._content;
  //     alert("You clicked the map at " + $(data).text());
  // }
  // marker.on('click', onPopupClick);

  // marker.on('click', onPopupClick);
}


function setMap() {
  if (window.navigator.geolocation) {
    // Geolocation available
    window.navigator.geolocation.getCurrentPosition(
      async function (result) {
          works(result.coords.latitude, result.coords.longitude);
          const user = await aws.currentAuthenticatedUser();
          const answer = await aws.updateUserCoordinates(user, "" + result.coords.latitude, "" + result.coords.longitude);
          console.log(answer)
          console.log(user)
        },
        console.log("")
    );
  }
}

$(document).ready(setMap());
currentAuthenticatedUser();

async function currentAuthenticatedUser() {
  let user = await aws.currentAuthenticatedUser({
      bypassCache: true
    })
    .then(user => document.getElementById("firstLast").innerHTML = user.attributes.given_name + " " + user.attributes.family_name)
    .catch(err => console.log(err));
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
    } else {};
  } else {};
}

window.onload = function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
}