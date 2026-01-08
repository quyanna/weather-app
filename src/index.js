import "./reset.css";
import "./styles.css";

// Template for how to import images if needed in JS
// import odinImage from "./odin.png";

console.log("Hello, world!");

const displayDiv = document.querySelector(".weather-data");
const form = document.querySelector(".location-form");
const currentLocationTitle = document.querySelector("h2 .current-location");
const myLocation = "Vancouver";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const formLocation = data.get("location");
  await writeWeather(formLocation);
});

async function writeWeather(location) {
  try {
    displayDiv.textContent = "Loading...";
    const weather = await fetchWeatherData(location);
    displayDiv.textContent = JSON.stringify(weather, null, "\t");
  } catch (error) {
    displayDiv.textContent = `Failed to write weather data (${error})`;
  }
}

async function fetchWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Ccurrent%2Calerts&key=X7MF6JQ3HQAZ7UEMLUSVFSNPV&contentType=json`
  );

  //if there is an HTTP Error
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return await response.json();
}
