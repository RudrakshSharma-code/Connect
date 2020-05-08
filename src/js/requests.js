import { listPosts, createPost } from "./aws.js";

var script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);

// async function showPosts() {
//   var posts = await listPosts();
//   for (let key in posts) {
//     var post = posts[key];
//     console.log(post);
//     var title = "<bold>TITLE: " + post.title + "</br>";
//     var user = " USER: " + post.user + "</br>";
//     var div = "<div id =" + key + ">" + title + user + "</div>";
//     var description = "";
//     for(let item in post.items){
//       description += item + " "
//     }
//     $("#requests").append(div);
//     $("#" + key).click(function () {
//       var a = confirm("Description: " + description);
//       if (a) {
//         alert("phone number: 123 456 7890");
//       }
//     });
//   }
// }



function works(x, y) {
  var mymap = L.map("mapid").setView([x, y], 13);
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

  function onPopupClick() {
    var data = this._popup._content;
    alert("You clicked the map at " + $(data).text());
    console.log(this.post)
    var description = this.post.items;
    location.replace("postdetails.html?id=" + this.post.id);
  }

  async function setMarkers() {
    var posts = await listPosts();
    for (let key in posts) {
      var post = posts[key];
      var title = post.title;
      var user = post.user;
      var mes = "<b>" + user + " </b><br>" + title;
      var marker = new L.marker([post.latitude, post.longitude]).addTo(mymap);
      marker.bindPopup(mes);
      marker.on("click", onPopupClick);
      marker.post = post;
      console.log(marker);
    }
  }
  console.log(setMarkers());

  var circle = L.circle([x, y], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 1500,
  }).addTo(mymap);
}

function setMap() {
  if (window.navigator.geolocation) {
    // Geolocation available
    window.navigator.geolocation.getCurrentPosition(function (result) {
      works(result.coords.latitude, result.coords.longitude);
    }, console.log(""));
  }
}

// $(document).ready(function(){
//     setMap();
//     console.log("asking for map");
//     getShortDesc();
// }
// );
// // showPosts();

// }

$(document).ready(function () {
  setMap();
});

// showPosts();

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