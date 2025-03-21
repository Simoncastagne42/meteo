import WeatherDays from "./WeatherDays/WeatherDays";
import WeatherInfo from "./WeatherInfo/WeatherInfo";
import SearchBar from "../SearchBar/SearchBar";
import "./WeatherCard.css";
import { useState } from "react";
import { useEffect } from "react";

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);
  const [city, setCity] = useState("Saint-Etienne");

  async function getData(selectedCity) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${selectedCity}&days=5&aqi=no&alerts=no`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      const formattedWeatherData = {
        city: json.location.name,
        country: json.location.country,
        days: json.forecast.forecastday.map(day => day.date),
        weatherByDay: json.forecast.forecastday.map(day => ({

          avgTemp: day.day.avgtemp_c,
          icon: day.day.condition.icon,
          description: day.day.condition.text,
          windSpeed: day.day.maxwind_kph,
        })),
      }
  
      setWeather(formattedWeatherData);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleDayClick(index) {
    setActiveDay(index);
  }

  useEffect(() => {
    getData(city);
  }, [city]);

  return (
    <div className="weather card blue-grey darken-1">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <SearchBar  onSearch={setCity}/>
          <WeatherInfo
            city={weather.city}
            country={weather.country}
            weatherOfActiveDay={weather.weatherByDay[activeDay]}
          />

          <WeatherDays
            days={weather.days}
            activeDay={activeDay}
            handleDayClick={handleDayClick}
          />
        </>
      )}
    </div>
  );
}

// style="font-weight: bold"

export default WeatherCard;
