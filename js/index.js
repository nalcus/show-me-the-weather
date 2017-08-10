var x = document.getElementById("demo");
var celcius = true;
var temp = 0;
var pos = {};

$(document).ready(function() {
  getLocation();
  $;
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function setPosition(position) {
  pos.lat = position.coords.latitude;
  pos.lon = position.coords.longitude;
  getWeather();
}

function getWeather() {
  var url =
    "https://fcc-weather-api.glitch.me/api/current?lat=" +
    pos.lat +
    "&lon=" +
    pos.lon;
  $.getJSON({
    url: url
  })
    .done(displayWeather)
    .fail(function(jqxhr, textStatus, err) {
      alert("error: " + textStatus);
    });
}

function displayWeather(q) {
  $("#location").text(q.name + ", " + q.sys.country);

  temp = q.main.temp;
  $("#icon").attr("src", q.weather[0].icon);
  $("#description").text(q.weather[0].main);
  showTemp();
  //x.innerHTML = JSON.stringify(q);
}

function showTemp() {
  if (celcius) {
    $("#temp").html(temp);
    $("#cflink").text("C");
  } else {
    $("#temp").html(Math.round(32 + temp * 1.8));
    $("#cflink").text("F");
  }
}

function switchTemp() {
  celcius = !celcius;
  showTemp();
}