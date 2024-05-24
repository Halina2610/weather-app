import React from "react";
import {WeatherItem} from "../../types/types";
import s from "./WeatherInfo.module.css"

type Props = {
    weatherData: WeatherItem;
    errorMessageDisplay: boolean;
    location: string;
    date: string;
};

export const WeatherInfo = ({
                                weatherData,
                                errorMessageDisplay,
                                location,
                                date,
                            }: Props) => {
    const {icon, temperature, description, wind, humidity, pressure} =
        weatherData;

    return (
        <div className={s["weather-container"]}>
            {errorMessageDisplay && (
                <div className={s["error-message"]}>
                    City not found. Please try again
                </div>
            )}
            {location && <div className={s["location"]}>{location}</div>}
            <div className={s["date"]}>{date}</div>
            <div className={s["weather"]}>
                {icon && <img className={s["weather-icon"]} src={icon} alt="Weather Icon"/>}
                <span className={s["temperature-num"]}>
        {temperature ? temperature : "—"}
      </span>
            </div>
            <div className={s["description"]}>{description}</div>
            <div>
                <div className={s["details-block"]}>
                    <span>{wind ? wind : "—"} </span>
                    <span> Wind</span>
                </div>
                <div>
                    <span>{humidity ? humidity : "—"} </span>
                    <span> Humidity</span>
                </div>
                <div>
                    <span>{pressure ? pressure : "—"} </span>
                    <span> Pressure</span>
                </div>
            </div>
        </div>
    );
};