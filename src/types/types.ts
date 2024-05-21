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
