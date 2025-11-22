import { useState, useEffect } from "react";
import weatherService from "../services/weather.js";
const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getAll(city).then((data) => {
      setWeather(data);
    });
  }, [city]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {city}</h2>
      Temperature {weather.main.temp} Celsius <br />
      <img
        src={
          "https://openweathermap.org/img/wn/" +
          weather.weather[0].icon +
          ".png"
        }
        alt="Weather icon"
      />
      <br />
      Wind {weather.wind.speed} m/s
    </div>
  );
};

export default Weather;
