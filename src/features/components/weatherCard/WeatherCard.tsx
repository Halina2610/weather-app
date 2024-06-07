import React from 'react';
import {useWeathers} from "../../weather/hooks/useWathers";
import {Spinner} from "../../../shared/components/spinner/Spinner";
import {WeatherInfo} from "../weatherInfo/WeatherInfo";
import {Search} from "../../../shared/components/search/Search";
import s from "./weatherCard.module.css"

export const WeatherCard = () => {
    const {backgroundImage, location, errorMessageDisplay, date, isLoading, weatherData, setCity} = useWeathers();

    return (
        <div
            className={s["backgroundImage"]}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {isLoading ? (
                <Spinner size={"large"} />
            ) : (
                <main className={s["container"]}>
                    <Search setCity={setCity} />
                    <WeatherInfo
                        date={date}
                        location={location}
                        weatherData={weatherData}
                        errorMessageDisplay={errorMessageDisplay}
                    />
                </main>
            )}
        </div>
    );
};

