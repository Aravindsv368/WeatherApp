// import("dotenv").config();
const apiKey = "123456";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  const arr = {
    Clouds:
      "https://png.pngtree.com/png-clipart/20220909/original/pngtree-sun-cloud-icon-weather-png-image_8508243.png",
    Mist: "https://cdn3.iconfinder.com/data/icons/weather-112/1024/mist-512.png",
    Rain: "https://cdn3.iconfinder.com/data/icons/sunnyday-2/142/full_Cloudy_medium_rain-1024.png",
    Snow: "https://cdn3.iconfinder.com/data/icons/sunnyday-2/142/full_cloudy_snow-1024.png",
    Drizzle: "https://cdn-icons-png.flaticon.com/512/6142/6142637.png",
    Thunderstrom:
      "https://static.vecteezy.com/system/resources/previews/020/995/365/non_2x/thunderstorm-weather-icon-png.png",
    Clear:
      "https://cdn0.iconfinder.com/data/icons/weather-forecast-17/128/forecast-weather_sun-clear-hot-512.png",
    not_found:
      "https://png.pngtree.com/png-clipart/20221228/original/pngtree-no-results-png-image_8816185.png",
  };

  if (data?.cod == "404") {
    fillData("", "", "", "", arr.not_found, "City not found");
  } else {
    fillData(
      data.name,
      Math.round(data.main.temp) + "°C",
      data.main.humidity + "%",
      data.wind.speed + "Km/h",
      arr[data.weather[0].main],
      data.weather[0].description
    );
  }
}

function fillData(city, temp, hVal, wV, src, wC) {
  document.querySelector(".city").innerHTML = city;
  document.querySelector(".temp").innerHTML = temp;
  document.querySelector(".humidity-value").innerHTML = hVal;
  document.querySelector(".wind-value").innerHTML = wV;
  document.querySelector(".weather-icon").src = src;
  document.querySelector(".weather-condition").innerHTML = wC;
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".about").classList.remove("d-none");
  checkWeather(event.target[0].value);
});
