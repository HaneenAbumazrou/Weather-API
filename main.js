
var div=document.getElementById('div2');
function renderWeather(weather) {
    console.log(weather);

    var resultsContainer = document.querySelector("#weather-results");
    resultsContainer.innerHTML = ""; 

    var city = document.createElement("h2");
    city.textContent = weather.name.toUpperCase();
    resultsContainer.append(city);

    var temp = document.createElement("p");
    temp.textContent = "Temperature: " + weather.main.temp + "F";
    resultsContainer.append(temp);

    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    resultsContainer.append(humidity);

    var wind = document.createElement("p");
    wind.textContent = "Wind: " + weather.wind.speed + " mph " + weather.wind.deg + "°";
    resultsContainer.append(wind);

    var weatherDetails = weather.weather[0];
    if (weatherDetails && weatherDetails.description) {
        var description = document.createElement("p");
        description.textContent = weatherDetails.description.toUpperCase();
        resultsContainer.append(description);
    }
    var bgImage=getImageUrl(weatherDetails.description);
    div.style.backgroundImage = `url(${bgImage})`;


}

function getImageUrl(condition) {
    const images = {
        "clear sky": "../assets/clear-sky.jpg",
        "few clouds": "../assets/few-clouds.jpg",
        "scattered clouds": "../assets/scattered_clouds.jpg",
        "broken clouds": "../assets/broken-clouds.jpg",
        "shower rain": "../assets/shower-rain.jpg",
        "light rain": "../assets/light_rain.jpg",
        "thunderstorm": "../assets/thunderstorm.webp",
        "snow": "../assets/snow.jpg",
        "mist": "../assets/mist.jpg"
    };

    return images[condition] || "../assets/weather-bg.jpg"; 
}

function fetchWeather(query) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=imperial&appid=8749ab5a75728e640366453ccf2cef4e";

    fetch(url)
    .then((response) => response.json())
    .then((data) => renderWeather(data));
}

document.getElementById("search-button").addEventListener("click", function() {
    var city = document.getElementById("city-input").value;
    if (city) {
        fetchWeather(city);
    }
});

fetchWeather("Amman");
