import React from "react";
import {useWeathers} from "./hooks/useWathers";
import {Search} from "./components/search/Search";
import {Toast} from "./components/toast";
import {WeatherInfo} from "./components/weatherInfo"
import s from "./App.module.css"


function App() {
    const { location, errorMessageDisplay, date, isLoading, weatherData, setCity } = useWeathers();


    if (isLoading) {
        return <div>Loading...</div>; // Замените на ваш прелоадер
    }

    return (
        <div className={s["container"]}>
            <Search setCity={setCity} />
            <WeatherInfo
                date={date}
                location={location}
                weatherData={weatherData}
                errorMessageDisplay={errorMessageDisplay}
            />
            <Toast />
        </div>
    );
}

export default App;