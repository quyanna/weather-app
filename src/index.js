import "./reset.css";
import "./styles.css";

import clearVideo from "./videos/clear.mp4";
import rainVideo from "./videos/rain.mp4";
import cloudyVideo from "./videos/cloudy.mp4";
import snowVideo from "./videos/snow.mp4";
import windVideo from "./videos/wind.mp4";
import { crossFadeTo, initBackgroundVideo } from "./background";

// Template for how to import images if needed in JS
// import odinImage from "./odin.png";

window.addEventListener("DOMContentLoaded", async () => {
  initBackgroundVideo();
  await crossFadeTo(clearVideo);
});

console.log("Hello, world!");

const displayDiv = document.querySelector(".weather-data");
const form = document.querySelector(".location-form");
const currentLocationTitle = document.querySelector("h2 .current-location");
const myLocation = "Vancouver";

const BACKGROUNDS = {
  clear: clearVideo,
  rain: rainVideo,
  cloudy: cloudyVideo,
  snow: snowVideo,
  wind: windVideo,
};

// Event listener for search form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  displayDiv.textContent = "loading...";
  const data = new FormData(e.target);
  const formLocation = data.get("location");
  const json = await fetchWeatherData(formLocation);
  console.log(json);

  applyBgFromData(json);

  //Get the background condition from icon

  displayDiv.textContent = JSON.stringify(json);
});

function pickThemeFromData(icon) {
  const currentWeather = (icon || "").toLowerCase();

  if (icon.includes("rain")) return "rain";
  if (icon.includes("snow")) return "snow";
  if (icon.includes("wind")) return "wind";
  if (icon.includes("cloud")) return "cloudy";
  return "clear";
}

async function applyBgFromData(data) {
  const theme = pickThemeFromData(data.currentConditions.icon ?? data);
  const src = BACKGROUNDS[theme];
  await crossFadeTo(src);
}

// Fetch weather data from Visual Crossing Weather API
async function fetchWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?iconSet=icons1&unitGroup=metric&include=current&key=X7MF6JQ3HQAZ7UEMLUSVFSNPV&contentType=json`
    );
    //if there is an HTTP Error
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return `There was a problem fetching weather data (${error})`;
  }
}
