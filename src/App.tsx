import React from "react";
import {useWeathers} from "./hooks/useWathers";
import {Search} from "./components/search/Search";
import {Toast} from "./components/toast";
import {WeatherInfo} from "./components/weatherInfo"
import s from "./App.module.css"


function App() {
    const {backgroundImage, location, errorMessageDisplay, date, isLoading, weatherData, setCity} = useWeathers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main className={s["backgroundImage"]} style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className={s["container"]}>
                <Search setCity={setCity}/>
                <WeatherInfo
                    date={date}
                    location={location}
                    weatherData={weatherData}
                    errorMessageDisplay={errorMessageDisplay}
                />
            </div>
            <Toast/>
        </main>
    );
}

export default App;