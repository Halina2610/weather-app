import React, { useState } from "react";

type SearchProps = {
    setCity: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({setCity}: SearchProps) {
    const [inputValue, setInputValue] = useState("");

    function submitCity() {
        setCity(inputValue);
        setInputValue("");
    }

    return (
        <section className="search-section">
            <input
                type="text"
                className="search-input"
                value={inputValue}
                placeholder="Search city"
                onChange={(e) => setInputValue(e.currentTarget.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        submitCity();
                    }
                }}
                aria-describedby="search-hint"
            />
            <span id="search-hint">Enter the name of the city and press Enter</span>
            <button
                type="button"
                className="search-btn"
                onClick={() => {
                    submitCity();
                }}
            >
            </button>
        </section>
    );
}
