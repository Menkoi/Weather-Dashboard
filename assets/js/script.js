var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search")
var mainContainer = document.querySelector("#card");

$('#searchBox').on('click', function() {
    value = document.getElementById("city").value;
    console.log(value);
var obj;

fetch("https://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=ab27f177782f621190cdae30ab462244")
.then(res => res.json())
  .then(data => obj = data)
  .then(() => console.log(obj))

  search(event);
});

var mainCard = $(".card-body");
    

function search(event) {
    event.preventDefault();

  request = $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather",
        type: "GET",
        data: {
            q: $("#city").val(),
            appid: "ab27f177782f621190cdae30ab462244",
            units: "metric",
        }
    })
    request.done(function(response) {
        formatSearch(response);
    })
}

function formatSearch(jsonObject) {
    var city_name = jsonObject.name;
    var city_weather = jsonObject.weather[0].main;
    var city_temp = jsonObject.main.temp;
    var city_hum = jsonObject.main.humidity;
    var city_wind = jsonObject.wind.speed;

    $("#city-name").text(city_name);
    $("#city-weather").text(city_weather);
    $("#city-temp").text("Temperature" + ":" + " " + city_temp + " " + "Celsius");
    $("#city-hum").text("Humidity" + ":" + " " + city_hum + "%");
    $("#city-wind").text("Wind Speed" + ":" + " " + city_wind + " " + "MPH");
}

