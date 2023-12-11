const apiKey = "bd2624bcdbaaa1d2ffee93157f780232";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

//when we enter the city name in input we are storing it in searchBox 
//and will add click evenr listner to search button to trigger check wather app 
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

//to change weather image according to api data 
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"
    }
    else {
        let data = await response.json();
        //console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

        if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/sun.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png"
        }

        //we hide the default data but need to show date when city name is entered
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }

}

searchBtn.addEventListener("click", function () {
    checkWeather(searchBox.value);
})
