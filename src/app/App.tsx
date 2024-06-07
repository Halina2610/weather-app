import React from "react";
import {ErrorBoundary} from "react-error-boundary";
import {WeatherCard} from "../features/components/weatherCard/WeatherCard";
import {ErrorFallback} from "../shared/components/errorBoundory/ErrorFallback";

function App() {

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <WeatherCard/>
        </ErrorBoundary>
    );
}

export default App;
