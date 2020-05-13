import * as aws from "./aws.js";
const user = aws.getUser();

function works(x, y) {
  var mymap = L.map("mapid").setView([x, y], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,'   
      + ' <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © '
      + '<a href="https://www.mapbox.com/">Mapbox</a>, Powered by <a href="https://www.esri.com/">Esri</a>',
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


 function setMap(){
    if (window.navigator.geolocation) {
        // Geolocation available
        window.navigator.geolocation.getCurrentPosition(
          async function (result) {
            works(result.coords.latitude, result.coords.longitude);
            L.esri.Geocoding.reverseGeocode()
            .latlng([result.coords.latitude, result.coords.longitude])
            .run(function (error, result, response) {
              console.log(error);
              console.log(result.latlng);
              console.log(result.address);
              document.getElementById("address").innerHTML = result.address.Match_addr;
              });
            const user = await aws.currentAuthenticatedUser();
            const answer = await aws.updateUserCoordinates(user, "" + result.coords.latitude, "" + result.coords.longitude);
            console.log(answer)
            console.log(user)
          },
          console.log("")
        );
      }
  }

  $(document).ready(function(){
    setMap();
    currentAuthenticatedUser();
    nullFix();
  })  

  async function currentAuthenticatedUser() {
    let user = await aws.currentAuthenticatedUser({
        bypassCache: true
      })
      document.getElementById("firstLast").innerHTML = user.attributes.given_name + " " + user.attributes.family_name
      document.getElementById("number").innerHTML = user.attributes.phone_number
      document.getElementById("email").innerHTML = user.attributes.email
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
  
function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
}

document.getElementById("button-addon3").addEventListener("click", function () {
  L.esri.Geocoding.geocode().text(document.getElementById("locsearch").value).run(async function (err, results, response) {
    if (err) {
      console.log(err);
      return;
    }
    const user = await aws.currentAuthenticatedUser();
    const answer = await aws.updateUserCoordinates(user, "" + results.results[0].latlng.lat, "" + results.results[0].latlng.lng);

    L.esri.Geocoding.reverseGeocode()
    .latlng([results.results[0].latlng.lat, results.results[0].latlng.lng])
    .run(function (error, result, response) {
      console.log(error);
      });
    console.log(results);
    console.log(response);
    console.log(user);
  });
})

  