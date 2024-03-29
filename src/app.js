function actualDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatWeekDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekDay = date.getDay();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekDays[weekDay];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let weatherForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
  
          <div class="col-2">
            <div class="weather-forecast-day">${formatWeekDays(
              forecastDay.dt
            )}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="40"
            />
            <div class="forecast-temperatures">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <spam class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°</spam>
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function getWeatherForcast(coordinates) {
  let apiKey = "a367566821d5256a1c920a360eab8e9e";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showForecast);
}

function displayTemp(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);

  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.weather[0].description;

  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let dayTime = document.querySelector("#day");
  dayTime.innerHTML = actualDate(response.data.dt * 1000);

  let trueIcon = response.data.weather[0].icon;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${trueIcon}@2x.png`
  );

  celciusTemperature = response.data.main.temp;

  getWeatherForcast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "a367566821d5256a1c920a360eab8e9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function submitCity(event) {
  event.preventDefault();
  let selectedCity = document.querySelector("#selected-city");
  searchCity(selectedCity.value);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", submitCity);

searchCity("Lisbon");
