import "./reset.css";
import "./styles.css";

// Template for how to import images if needed in JS
// import odinImage from "./odin.png";

console.log("Hello, world!");

const displayDiv = document.querySelector(".weather-data");
const myLocation = "Vancouver";

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Ccurrent%2Calerts&key=X7MF6JQ3HQAZ7UEMLUSVFSNPV&contentType=json`
    );

    //if there is an HTTP Error
    if (!response.ok) {
      throw new Error(`HTTP Error: Status ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching weather data", error);
    return null;
  }
}

const weather = await getWeatherData(myLocation);
displayDiv.textContent = JSON.stringify(weather, null, "\t");
