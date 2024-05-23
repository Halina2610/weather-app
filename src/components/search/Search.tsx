import React, { useState } from "react";

type Props = {
    setCity: React.Dispatch<React.SetStateAction<string>>;
};

export const Search = ({setCity}: Props) => {
    const [inputValue, setinputValue] = useState("");

    function submitCity() {
        setCity(inputValue);
        setinputValue("");
    }

    return (
        <section className="search-section">
            <input
                type="text"
                className="search"
                value={inputValue}
                placeholder="Search city"
                onChange={(e) => setinputValue(e.currentTarget.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        submitCity();
                    }
                }}
            />
            <button
                type="button"
                className="search-btn"
                onClick={() => {
                    submitCity();
                }}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </section>
    );
}
