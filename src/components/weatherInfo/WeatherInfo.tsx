import React from "react";
import { WeatherItem } from "../../types/types";
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
    const { icon, temperature, description, wind, humidity, pressure } =
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
            {icon && <img className={s["weather-icon"]} src={icon} alt="Weather Icon" />}

            <span className={s["temperature-num"]}>
        {temperature ? temperature : "—"}
      </span>
            <div className={s["description"]}>{description}</div>
            <div className={s["details"]}>
                <div className={s["details-column"]}>
                    <p>{wind ? wind : "—"}</p>
                    <p>Wind</p>
                </div>
                <div className={s["details-column"]}>
                    <p>{humidity ? humidity : "—"}</p>
                    <p>Humidity</p>
                </div>
                <div className={s["details-column"]}>
                    <p>{pressure ? pressure : "—"}</p>
                    <p>Pressure</p>
                </div>
            </div>
        </div>
    );
};