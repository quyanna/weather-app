import "./reset.css";
import "./styles.css";

import { fetchWeatherData, createWeatherObject } from "./api-handling";

let activeLayer, idleLayer;

window.addEventListener("DOMContentLoaded", async () => {
  const bgLayers = document.querySelectorAll(".bg .bg-layer");
  activeLayer = bgLayers[0];
  idleLayer = bgLayers[1];
  activeLayer.className = "bg-layer active clear";
  idleLayer.className = "bg-layer idle";
});

console.log("Hello, world!");

const displayDiv = document.querySelector(".weather-data");
const form = document.querySelector(".location-form");
const currentLocationTitle = document.querySelector("h2 .current-location");
const myLocation = "Vancouver";

// Event listener for search form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  displayDiv.textContent = "loading...";
  const data = new FormData(e.target);
  const formLocation = data.get("location");
  const json = await fetchWeatherData(formLocation);
  console.log(json);

  //do nothing if no data
  if (!json) {
    displayDiv.textContent = "Error fetching weather data.";
    return;
  }

  //get the weather object
  const weatherObj = createWeatherObject(json);

  displayDiv.textContent = JSON.stringify(weatherObj, null, 2);
  applyBgFromData(json);
});

function pickThemeFromData(icon) {
  console.log("Picking theme from icon: " + icon);
  const currentWeather = (icon || "").toLowerCase();

  if (currentWeather.includes("rain")) return "rain";
  if (currentWeather.includes("snow")) return "snow";
  if (currentWeather.includes("wind")) return "wind";
  if (currentWeather.includes("cloud")) return "cloudy";
  return "clear";
}

async function applyBgFromData(data) {
  console.log("Applying background from data: " + data);
  try {
    if (!data) throw new Error("No data provided for background selection");
  } catch (error) {
    console.error("Error applying background from data: " + error);
    return;
  }
  const theme = pickThemeFromData(data.currentConditions.icon ?? data);

  if (activeLayer.classList.contains(theme)) return;

  idleLayer.className = "bg-layer idle " + theme;
  idleLayer.classList.add("active");
  activeLayer.classList.remove("active");

  setTimeout(() => {
    const temp = activeLayer;
    activeLayer = idleLayer;
    idleLayer = temp;
    idleLayer.className = "bg-layer idle";
  }, 650);
}
