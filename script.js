const apiKey = "f939a86e14d4769f50eb79261dd152c3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity").innerHTML =
    data.main.humidity + "&percnt;";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}

searchBtn.addEventListener("click", () => {
  // Use .value because searchBox is the input element.
  // searchBox.value gets the text the user typed, like "Accra".
  checkWeather(searchBox.value);
});
searchBox.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    checkWeather(searchBox.value);
  }
})

checkWeather(city);
