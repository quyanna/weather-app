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

const btn = document.getElementById("searchBtn");
const input = document.getElementById("location");
const glassPanel = document.querySelector(".glass");

btn.onclick = loadData;
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    loadData();
  }
});

// Loads the weather data for the location currently in the search bar
async function loadData() {
  const location = input.value.trim();
  if (!location) return;

  document.body.style.cursor = "wait";

  try {
    const json = await fetchWeatherData(location);
    console.log(json);
    const w = createWeatherObject(json);

    document.getElementById("address").textContent = w.address;
    document.getElementById("temp").textContent = w.temp + "°";
    document.getElementById("conditions").textContent = w.conditions;
    document.getElementById("feelslike").textContent = `${w.feelsLike}°`;
    document.getElementById("wind").textContent = `${w.wind} km/h`;
    document.getElementById("humidity").textContent = `${w.humidity}%`;
    document.getElementById("uv").textContent = w.uv;
    document.getElementById("sunrise-value").textContent = w.sunrise;
    document.getElementById("sunset-value").textContent = w.sunset;

    applyBgFromData(json);

    if (glassPanel.classList.contains("collapsed")) {
      glassPanel.classList.remove("collapsed");
    }
  } catch (error) {
    console.error("Error fetching weather data: " + error);
  } finally {
    document.body.style.cursor = "default";
  }
}

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
