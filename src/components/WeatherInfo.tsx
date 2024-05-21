import React from "react";
import {WeatherItem} from "../types/types";

type WeatherInfo = {
  weatherData: WeatherItem;
  errorMessageDisplay: boolean;
  location: string;
  date: string;
};

export default function WeatherInfo({weatherData, errorMessageDisplay, location, date}: WeatherInfo){
  const { icon, temperature, description, wind, humidity, pressure } =
    weatherData;

  return (
    <div className="weather-container">
      {errorMessageDisplay && (
        <div className="error-message">City not found. Please try again</div>
      )}
      {location && (
        <div className="location">
          <i className="fa-solid fa-location-dot"></i>
          {location}
        </div>
      )}
      <div className="date">{date}</div>
      {icon && (
        <div className="weather-icon-container">
          <img className="weather-icon" src={icon} alt="Weather Icon" />
        </div>
      )}

      <div className="temperature">
        <span className="temperature-num">
          {temperature ? temperature : "—"}
        </span>
      </div>
      <div className="description">{description}</div>
      <div className="details">
        <div className="details-column wind">
          <p className="wind-num">{wind ? wind : "—"}</p>
          <p className="details-desc">Wind</p>
        </div>
        <div className="details-column humidity">
          <p className="humidity-num">{humidity ? humidity : "—"}</p>
          <p className="details-desc">Humidity</p>
        </div>
        <div className="details-column pressure">
          <p className="pressure-num">{pressure ? pressure : "—"}</p>
          <p className="details-desc">Pressure</p>
        </div>
      </div>
    </div>
  );
}
