//Module that handles all API calls and formats the data from them

// Fetch weather data from Visual Crossing Weather API
export async function fetchWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?&unitGroup=metric&include=current&key=X7MF6JQ3HQAZ7UEMLUSVFSNPV&contentType=json`
    );
    //if there is an HTTP Error
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return null;
  }
}

//Extract the data from the json object
export function createWeatherObject(json) {
  if (!json) return;

  try {
    const weatherData = {
      address: json.resolvedAddress,
      conditions: json.currentConditions.conditions,
      feelsLike: Math.round(json.currentConditions.feelslike),
      humidity: json.currentConditions.humidity,
      temp: Math.round(json.currentConditions.temp),
      sunrise: json.currentConditions.sunrise,
      sunset: json.currentConditions.sunset,
      timezone: json.timezone,
      icon: json.currentConditions.icon.toLowerCase(),
      wind: json.currentConditions.windspeed,
      uv: json.currentConditions.uvindex,
    };
    return weatherData;
  } catch (error) {
    console.error("Error creating weather object: " + error);
    return null;
  }
}
