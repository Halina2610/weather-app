import { useEffect, useState } from "react";
import {WeatherData, WeatherItem} from "../types/types";
import {toast} from "react-toastify";

export function useWeathers() {
    const [location, setLocation] = useState<string>("");
    const [errorMessageDisplay, setErrorMessageDisplay] = useState<boolean>(false);
    const [date, setDate] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [weatherData, setWeatherData] = useState<WeatherItem>({
        icon: "",
        temperature: "",
        description: "",
        wind: "",
        humidity: "",
        pressure: "",
    });

    useEffect(() => {
        getDate();
        getWeatherByGeolocation();
    }, []);

    useEffect(() => {
        getWeatherByCity(city);
    }, [city]);

    function getDate() {
        const today = new Date();
        const weekday = today.toLocaleString("en", { weekday: "long" });
        const day = today.getDate();
        const month = today.toLocaleString("en", { month: "long" });
        const currentDate = `${weekday} ${day} ${month}`;
        setDate(currentDate);
    }

    function getWeatherByGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
            toast.success('Weather geolocation fetched successfully')
        }

        async function success(position: GeolocationPosition) {
            const { latitude, longitude } = position.coords;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`;
            await fetchWeatherData(api);
            toast.success('Weather data fetched successfully')
        }
    }

    async function getWeatherByCity(city: string) {
        if (city) {
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
            await fetchWeatherData(api);
            toast.success('Weather data fetched successfully')
        }
    }

    async function fetchWeatherData(api: string) {
        setIsLoading(true);
        try {
            const res = await fetch(api);
            const data = await res.json();
            displayWeather(data);
            toast.success('Weather data fetched successfully')
        } catch (error) {
            console.error('Error fetching weather data', error);
            toast.error('Error fetching weather data')
        }
        setIsLoading(false);
    }

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
            toast.success('Weather data fetched successfully')

        } else {
            console.error('Error data')
            toast.error('Error data')

        }
    }

    function capitalizeFirstLetter(string: string) {
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

    return { location, errorMessageDisplay, date, isLoading, weatherData, setCity };
}
