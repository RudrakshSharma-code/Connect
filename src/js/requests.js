
import { listPosts, createPost } from "./aws.js"

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

async function showPosts(){
    var posts = await listPosts();
    for (let key in posts) {
        var post = posts[key];
        console.log(post);
        var title = "<bold>TITLE: " + post.title + "</br>";
        var user = " USER: " + post.user + "</br>";
        var desc = "DESCRIPTION: " + post.description + "</br></p>";
        var div = "<div id =" + key + ">"+title + user + "</div>"
        $("#requests").append(div);
        $("#"+key).click(
            function(){
                var a =confirm("Description: " + posts[key].description);
                if(a){
                    alert("phone number: 123 456 7890");
                }
            }
        );

    }
}



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
  }

  async function getShortDesc(){
    var arr = []
    var posts = await listPosts();
    for (let key in posts) {
      var post = posts[key];
      var title = post.title;
      var user = post.user;
      var mes = "<b>"+user+" </b><br>" + title;
      arr.push(mes);
    }
    console.log(arr);
    return arr;
  }

  var desc = ["<b>Ana Banana</b><br>Oranges needed", 
              "<b>Vitoria Martins</b><br>Groceries needed   ", 
              "<b>Jeremy </b><br>Need Food   ",
              "<b>Rudy</b><br>Someone help   ",
              "<b>Slavat</b><br>Out of Tylenol   "]

  // let i = 0;
  // desc.forEach(mes=>function(){
  //   var marker = new L.marker([(x + (-0.3)**i), (y - (-0.3)**i)]).addTo(mymap);
  //   marker
  //     .bindPopup(mes)
  //     // .bindPopup("Youre here!")
  //     .openPopup();
  //     marker.on('click', onPopupClick);
  //     i++;
  // })

  // var desc = getShortDesc();

  for (var i = 0; i < desc.length; i++) {
    var marker = new L.marker([(x + (-0.3)**i), (y - (-0.3)**i)]).addTo(mymap);
    marker
      .bindPopup(desc[i]);
      marker.on('click', onPopupClick);
  }

  var circle = L.circle([x, y], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 1500
}).addTo(mymap);
    

    // var marker = new L.marker([49.2827, 123.1207]).addTo(mymap);
    // marker
    //   .bindPopup("<b>First Last</b><br>Food needed   ")
    //   // .bindPopup("Youre here!")
    //   .openPopup();
    //   marker.on('click', onPopupClick);
    
    
    
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

$(document).ready(function(){
    setMap();
    console.log("asking for map");
    
}
);
showPosts();