import React from "react";
import { useWeathers } from "./hooks/useWathers";
import { WeatherInfo } from "./components/weatherInfo";
import s from "./App.module.css";
import { Search } from "./components/search";
import { Spinner } from "./components/spinner";
import { ErrorBoundary } from 'react-error-boundary';
import {ErrorFallback} from "./components/errorBoundory";

function App() {
    const {backgroundImage, location, errorMessageDisplay, date, isLoading, weatherData, setCity} = useWeathers();

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
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
        </ErrorBoundary>
    );
}

export default App;
