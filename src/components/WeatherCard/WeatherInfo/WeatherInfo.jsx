function WeatherInfo({ city,country, weatherOfActiveDay }) {
  return (
    <div className="card-content white-text">
      <span className="card-title">{city}</span>
      <span className="card-title">{country}</span>
      <p>
        <img src={weatherOfActiveDay.icon} alt={weatherOfActiveDay.description} />
      </p>
      <span className="temperature">{weatherOfActiveDay.avgTemp}°</span>
      <div className="wind">Vent {weatherOfActiveDay.windSpeed}km/h</div>
    </div>
  );
}

export default WeatherInfo;
