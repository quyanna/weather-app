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
  displayDiv.textContent = "loading...";
  const data = new FormData(e.target);
  const formLocation = data.get("location");
  displayDiv.textContent = await fetchWeatherData(formLocation);
});

async function fetchWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Ccurrent%2Calerts&key=X7MF6JQ3HQAZ7UEMLUSVFSNPV&contentType=json`
    );
    //if there is an HTTP Error
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const jsonData = await response.json();
    return JSON.stringify(jsonData);
  } catch (error) {
    return `There was a problem fetching weather data (${error})`;
  }
}
