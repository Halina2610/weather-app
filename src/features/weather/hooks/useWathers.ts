import { useState, useEffect } from 'react';
import { useDate } from './useDate';
import { useBackgroundImage } from './useBackgroundImage';
import {WeatherData, WeatherItem} from "../../types/types";
import {getWeatherByCity, getWeatherByGeolocation} from "../../services/weatherService";

export function useWeathers() {
    const [location, setLocation] = useState("");
    const [errorMessageDisplay, setErrorMessageDisplay] = useState(false);
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [weatherData, setWeatherData] = useState<WeatherItem>({
        icon: "",
        temperature: "",
        description: "",
        wind: "",
        humidity: "",
        pressure: "",
    });

    const date = useDate();
    const backgroundImage = useBackgroundImage();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByGeolocation(latitude, longitude)
                    .then(data => displayWeather(data))
                    .catch(error => console.error(`Error fetching weather data: ${error.message}`));
            });
        }
    }, []);

    useEffect(() => {
        if (city) {
            getWeatherByCity(city)
                .then(data => displayWeather(data))
                .catch(error => console.error(`Error fetching weather data: ${error.message}`));
        }
    }, [city]);

    function displayWeather(data: WeatherData) {
        if (data.weather) {
            const kelvin = 273;
            checkFor404(data);
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

    function capitalizeFirstLetter(string: string): string {
        return string[0].toUpperCase() + string.slice(1);
    }

    function checkFor404(data: WeatherData) {
        if (data.cod === "404") {
            resetData();
            setErrorMessageDisplay(true);
        } else {
            setErrorMessageDisplay(false);
        }
    }

    function resetData() {
        setWeatherData({
            icon: "",
            temperature: "",
            description: "",
            wind: "",
            humidity: "",
            pressure: "",
        });
        setLocation("");
    }

    return {backgroundImage, location, errorMessageDisplay, date, isLoading, weatherData, setCity};
}
