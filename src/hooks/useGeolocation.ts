import { useEffect, useState } from 'react';
import { getWeatherByGeolocation } from '../services/weatherService';
import { WeatherData, WeatherItem } from "../types/types";

export function useGeolocation() {
    const [location, setLocation] = useState<string>("");
    const [weatherData, setWeatherData] = useState<WeatherItem>({
        icon: "",
        temperature: "",
        description: "",
        wind: "",
        humidity: "",
        pressure: "",
    });

    useEffect(() => {
        getWeather();
    }, []);

    async function getWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
                const {latitude, longitude} = position.coords;
                try {
                    const data = await getWeatherByGeolocation(latitude, longitude);
                    displayWeather(data);
                } catch (error: any) {
                    console.warn(`ERROR(${error.code}): ${error.message}`);
                }
            });
        }
    }

    function displayWeather(data: WeatherData) {
        if (data.weather) {
            const kelvin = 273;
            setWeatherData({
                icon: `./images/${data.weather[0].icon}.png`,
                temperature: `${Math.floor(data.main.temp - kelvin)} °C`,
                description: capitalizeFirstLetter(data.weather[0].description),
                wind: `${data.wind.speed} m/s`,
                humidity: `${data.main.humidity} %`,
                pressure: `${data.main.pressure} hPa`,
            });
            setLocation(`${data.name}, ${data.sys.country}`);
        } else {
            console.error('Error data')
        }
    }

    function capitalizeFirstLetter(string: string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    return { location, weatherData };
}
