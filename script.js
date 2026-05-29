const apiKey = "f939a86e14d4769f50eb79261dd152c3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  //This is if the code fails or typed in city is wrong
  if (response.status === 404) {
    setTimeout(() => {
      document.querySelector(".error").style.display = "block";

      document.querySelector(".weather").style.display = "none";
      setTimeout(() => {
        document.querySelector(".error").style.display = "none";
      }, 1500);
    }, 0);

    return;
  }
  const data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity").innerHTML =
    data.main.humidity + "&percnt;";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "images/mist.png";
  }

  // Show the weather section only after checkWeather() runs from a search.
  //By changing the display i put in the css to 'block'
  document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
  // Use .value because searchBox is the input element.
  // searchBox.value gets the text the user typed, like "Accra".
  checkWeather(searchBox.value);
});
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
