import {WeatherData} from "../types/types";

export async function getWeatherByGeolocation(latitude: number, longitude: number): Promise<WeatherData> {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`;
    const res = await fetch(api);
    return res.json();
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
    const res = await fetch(api);
    return res.json();
}