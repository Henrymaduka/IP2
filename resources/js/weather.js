let lat = 0;
let lon = 0;
let days = "&days=7";
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const baseURL = "http://api.weatherstack.com/current?access_key=b10aac74144b829eb3d430f7efb6617e&query=";

$(document).ready(function () {
    //when you do geo-location
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGetPos);
    }
    // when you do city search 
    $("#search").click(getCity);

    //when you do longitude and latitude search 
    $("#submit").submit(getCoordinates);
});

function successGetPos(pos) {
    const cors = "https://cors-anywhere.herokuapp.com/";
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    let url = lat + "," + lon + days;
    $.getJSON(cors + baseURL + url, getWeather);
}

function getWeather(json) {
    $("#city").val(json.location.name + ", " + json.location.country);
    $("#lat").val(json.location.lat);
    $("#lon").val(json.location.lon);
    $("#wind").html(json.current.wind_kph);
    $("#hum").html(json.current.humidity);
    $("#pressure").html(json.current.pressure_mb);
    $("#icon").html("<img src='http:" + json.current.condition.icon.replace("64x64", "128x128") + "'>");
    $("#weather").html(json.current.condition.text);
    $("#forecast").empty();
    for (let i = 0; i < json.forecast.forecastday.length; i++) {
        let d = new Date(json.forecast.forecastday[i].date);
        if (i == 0) {
            $("#today").html(json.forecast.forecastday[i].day.avgtemp_c)
        } else {
            let day = "<p class ='row'>" + weekdays[d.getDay()] + "</p>";
            let pic = "<img class ='row' src='http:" + json.forecast.forecastday[i].day.condition.icon + "'>";
            let p = "<div class ='row'>" + json.forecast.forecastday[i].day.avgtemp_c + "</div>";
            $('#forecast').append("<div class='col span-1-of-6 box card' id = 'day" + i + "'>" + day + pic + p + "</div>")
        }
    }

    return 0;
}

function getCity() {
    let openWeatherQuery = baseURL,
        cityName = $("#city").val(),
        cors = "https://cors-anywhere.herokuapp.com/";
    $.getJSON(cors + openWeatherQuery + cityName + days, getWeather);
    return 0;
}

function getCoordinates() {
    lat = $("#lat").val();
    lon = $("#lon").val();
    const cors = "https://cors-anywhere.herokuapp.com/";
    let url = lat + "," + lon + days;
    $.getJSON(cors + baseURL + url, getWeather);
}