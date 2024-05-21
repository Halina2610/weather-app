import React, { useEffect } from "react";

interface WeatherFetcherProps {
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

    return null; // Компонент не отрисовывает ничего, только выполняет запросы к API
};

export default WeatherFetcher;

//types

export type WeatherData = {
    weather: Array<{
        id: "string";
        main: "string";
        description: "string";
        icon: "string";
    }>;
    main: {
        temp: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    sys: {
        country: string;
    };
    name: string;
    cod: string | number;
}

export type WeatherItem = {
    icon: string;
    temperature: string;
    description: string;
    wind: string;
    humidity: string;
    pressure: string;
}
