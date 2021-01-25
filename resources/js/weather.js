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
    $("#city").val(json['location']['name'] + ", " + json['location']['country']);
    $("#lat").val(json['location']['lat']);
    $("#lon").val(json['location']['lon']);
    $("#wind").html(json['current']['wind_speed']);
    $("#hum").html(json['current']['humidity']);
    $("#pressure").html(json['current']['pressure']);
    $("#icon").html("<img alt='icon' src='" + json['current']['weather_icons'][0] + "'>");
    $("#weather").html(json['current']['weather_descriptions'][0]);
    $("#forecast").empty();
    $("#today").html(json['current']['temperature']);

    return 0;
}

function getCity() {
    let cityName = $("#city").val(),
        cors = "https://cors-anywhere.herokuapp.com/";
    $.getJSON(cors + baseURL + cityName + days, getWeather);
    return 0;
}

function getCoordinates() {
    lat = $("#lat").val();
    lon = $("#lon").val();
    const cors = "https://cors-anywhere.herokuapp.com/";
    let url = lat + "," + lon + days;
    $.getJSON(cors + baseURL + url, getWeather);
}
