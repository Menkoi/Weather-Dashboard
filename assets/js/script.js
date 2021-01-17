var searchHistory = [];

function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedCities !== null) {
        searchHistory = storedCities;
    };
     // lists up to 8 locations
    for (i = 0; i < searchHistory.length; i++) {
        if (i == 8) {
            break;
          }
        cityListButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        cityListButton.text(searchHistory[i]);
        $(".list-group").append(cityListButton);
    }
};

getItems();


$('#searchBox').on('click', function() {
    value = document.getElementById("city").value;
    console.log(value);
    var obj;
   

fetch("https://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=ab27f177782f621190cdae30ab462244")
.then(res => res.json())
  .then(data => obj = data)
  .then(() => console.log(obj))

  
});

function search(event) {
    //event.preventDefault();
    $("#weeklyForecast").empty();

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


// 5 day forecast 
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city_name + "&appid=ab27f177782f621190cdae30ab462244", 
    method: "GET"
}).then(function (response) {
    for (i = 0; i < 5; i++) {
        var newCard = $("<div>").attr("class", " card fiveDay bg-primary text-white rounded-lg p-2");
        $("#weeklyForecast").append(newCard);

        var myDate = new Date(response.list[i * 8].dt * 1000);
        newCard.append($("<h4>").html(myDate.toLocaleDateString()));

        var iconCode = response.list[i * 8].weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        newCard.append($("<img>").attr("src", iconURL));

        var temp = Math.round((response.list[i * 8].main.temp - 273.15) * 1.80 + 32);
        newCard.append($("<p>").html("Temp: " + temp + " &#8457"));

        var humidity = response.list[i * 8].main.humidity;
        newCard.append($("<p>").html("Humidity: " + humidity)); 
       
    }
});

};

$("#searchBox").click(function() {
    city = $("#city").val().trim();
    search();
    var checkArray = searchHistory.includes(city);
    if (checkArray == true) {
        return
    }
    else {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        var cityListButton = $("<a>").attr({
            // list-group-item-action keeps the search history buttons consistent
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        cityListButton.text(city);
        $(".list-group").append(cityListButton);
        
    };
});


