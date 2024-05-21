import React, { useEffect } from "react";
import {WeatherData} from "../types/types";

type WeatherFetcherProps = {
    onWeatherData: (data: WeatherData) => void;
    onError: () => void;
    city?: string;
}

const WeatherFetcher: React.FC<WeatherFetcherProps> = ({
                                                           onWeatherData,
                                                           onError,
                                                           city,
                                                       }) => {
    useEffect(() => {
        if (city) {
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
            fetchWeatherData(api);
        } else {
            getWeatherByGeolocation();
        }
    }, [city]);

    function getWeatherByGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        }

        function success(position: GeolocationPosition) {
            const { latitude, longitude } = position.coords;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`;
            fetchWeatherData(api);
        }
    }

    function fetchWeatherData(api: string) {
        fetch(api)
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === "404") {
                    onError();
                } else {
                    onWeatherData(data);
                }
            })
            .catch(() => {
                onError();
            });
    }

    return null;
};

export default WeatherFetcher;
