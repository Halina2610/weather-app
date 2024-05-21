import {WeatherData} from "../types/types";

export async function fetchWeatherData(api: string): Promise<WeatherData> {
    try {
        const response = await fetch(api);
        const data = await response.json();
        return data as WeatherData;
    } catch (error) {
        throw new Error("Failed to fetch weather data");
    }
}