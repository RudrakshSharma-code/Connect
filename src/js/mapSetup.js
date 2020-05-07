import * as aws from "./aws.js";

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


 function setMap(){
    if (window.navigator.geolocation) {
        // Geolocation available
        window.navigator.geolocation.getCurrentPosition(
          function (result) {
            works(result.coords.latitude, result.coords.longitude);
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
  