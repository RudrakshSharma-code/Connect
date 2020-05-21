import * as aws from "./aws.js";
const user = aws.getUser();

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
  console.log(user);
  var ulatitude = user.attributes["custom:latitude"];
  var ulongitude = user.attributes["custom:longitude"];
  works(ulatitude, ulongitude);
}

//start
$(document).ready(function () {
  changeHtml();
  setButton();
  setMap();
  nullFix();
  coding();
  editName();
  editPhone();
  oneBinding();
  twoBinding();
  fourBinding();
})

//address reverse coding
async function coding() {
  const user = await aws.currentAuthenticatedUser();
  console.log(user.attributes["custom:latitude"])
  console.log(user.attributes["custom:longitude"])
  L.esri.Geocoding.reverseGeocode()
    .latlng([user.attributes["custom:latitude"], user.attributes["custom:longitude"]])
    .run(function (error, result, response) {
      console.log(error);
      console.log(result);
      document.getElementById("address").innerHTML = result.address.Match_addr;
    });
}

//retrieve user info
async function changeHtml() {
  let u = await user;
  $("#firstLast").text(u.attributes.given_name + " " + u.attributes.family_name);
  $("#number").text(u.attributes.phone_number);
  $("#email").text(u.attributes.email);

  let posts = await aws.listPosts({
    userID: {
      eq: u.attributes.sub
    }
  });
  console.log(posts);

}

function setButton() {
  $("#posts").on("click", function () {
    location.replace("previousposts.html");
  })
}


//DELETE
async function deletePost(id) {
  return await aws.deletePost(id);
}

//edit functions
function editName() {
  document.getElementById("submitName").addEventListener("click", async function () {
    const user = await aws.currentAuthenticatedUser();
    const answer = await aws.updateUserAttributes(
      user,
      document.getElementById("firstInput").value,
      document.getElementById("lastInput").value);
    $("#firstLast").text(user.attributes.given_name + " " + user.attributes.family_name);
    document.getElementById("submitName").click();
    document.getElementById("firstInput").style.display = "none";
    document.getElementById("lastInput").style.display = "none";
    document.getElementById("submitName").style.display = "none";
  })
}

function editPhone() {
  document.getElementById("submitTel").addEventListener("click", async function () {
    const user = await aws.currentAuthenticatedUser();
    const answer = await aws.updateUserPhone(
      user,
      "+1" + document.getElementById("phoneInput").value);
    $("#number").text(user.attributes.phone_number);
    document.getElementById("submitTel").click();
    document.getElementById("phoneInput").style.display = "none";
    document.getElementById("submitTel").style.display = "none";
  })
}

//reveal inputs and buttons
function oneBinding() {
  document.getElementById("edit1").addEventListener("click", function () {
    let firstInput = document.getElementById("firstInput");
    let lastInput = document.getElementById("lastInput");
    let submitName = document.getElementById("submitName");
    if (firstInput.style.display = "none") {
      firstInput.style.display = "inline";
      lastInput.style.display = "inline";
      submitName.style.display = "inline";
    }
  });
}

function twoBinding() {
  document.getElementById("edit2").addEventListener("click", function () {
    let phoneInput = document.getElementById("phoneInput");
    let submitTel = document.getElementById("submitTel");
    if (phoneInput.style.display = "none") {
      phoneInput.style.display = "inline";
      submitTel.style.display = "inline";
    }
  });
}

function fourBinding() {
  document.getElementById("edit4").addEventListener("click", function () {
    window.location.replace("profileSetup.html");
  })
}


//sign out
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
    } else {}
  } else {}
}

function nullFix() {
  document.getElementById("logout").addEventListener("click", signOut);
};