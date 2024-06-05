import {WeatherData} from "../types/types";

export async function getWeatherByGeolocation(): Promise<WeatherData | null> {
    if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const {latitude, longitude} = position.coords;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`;
        return fetchWeatherData(api);
    } else {
        console.error('Geolocation is not supported by this browser.');
        return null;
    }
}

export async function getWeatherByCity(city: string): Promise<WeatherData | null> {
    if (city) {
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
        return fetchWeatherData(api);
    } else {
        console.error('Please enter a valid city name');
        return null;
    }
}

export async function fetchWeatherData(api: string): Promise<WeatherData> {
    const res = await fetch(api);
    if (!res.ok) {
        console.error('Network response was not ok');
        throw new Error('Network response was not ok');
    }
    const data: WeatherData = await res.json();
    if (data.cod === "404") {
        console.error(data.message);
        throw new Error(data.message);
    }
    return data;
}
