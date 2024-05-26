import {useEffect, useState} from "react";
import {WeatherData, WeatherItem} from "../types/types";
import night from "../assets/images/night.webp";
import morning from "../assets/images/morning.webp";
import afternoon from "../assets/images/afternoon.webp";
import evening from "../assets/images/evening.webp";

export function useWeathers() {
    const [location, setLocation] = useState<string>("");
    const [errorMessageDisplay, setErrorMessageDisplay] = useState<boolean>(false);
    const [date, setDate] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [backgroundImage, setBackgroundImage] = useState("");
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
        if (city) {
            getWeatherByCity(city)
        }
    }, [city]);


    useEffect(() => {
        const hour = new Date().getHours();

        if (hour < 6 || hour >= 20) {
            setBackgroundImage(night);
        } else if (hour < 12) {
            setBackgroundImage(morning);
        } else if (hour < 17) {
            setBackgroundImage(afternoon);
        } else {
            setBackgroundImage(evening);
        }
    }, []);

    function getDate() {
        const today = new Date();
        const weekday = today.toLocaleString("en", {weekday: "long"});
        const day = today.getDate();
        const month = today.toLocaleString("en", {month: "long"});
        const currentDate = `${weekday} ${day} ${month}`;
        setDate(currentDate);
    }

    function getWeatherByGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        }

        async function success(position: GeolocationPosition) {
            const {latitude, longitude} = position.coords;
            // const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=acc3f99252df38905471edbf93b6469f`;
            await fetchWeatherData(api);
        }

        function error(err: GeolocationPositionError) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
    }

    async function getWeatherByCity(city: string) {
        if (city) {
            // const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=acc3f99252df38905471edbf93b6469f`;
            await fetchWeatherData(api);
        } else {
            console.error('Please enter a valid city name');
        }
    }

    async function fetchWeatherData(api: string) {
        setIsLoading(true);
        try {
            const res = await fetch(api);
            const data = await res.json();
            if (data.cod === "404") {
                throw new Error(data.message);
            }
            displayWeather(data);
        } catch (error: any) {
            console.error(`Error fetching weather data: ${error.message}`);
            setErrorMessageDisplay(true); // Добавьте эту строку
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

        } else {
            console.error('Error data')
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

    return {backgroundImage, location, errorMessageDisplay, date, isLoading, weatherData, setCity};
}
