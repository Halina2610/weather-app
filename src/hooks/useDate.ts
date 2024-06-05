import { useState, useEffect } from 'react';

export function useDate() {
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        getDate();
    }, []);

    function getDate() {
        const today = new Date();
        const weekday = today.toLocaleString("en", {weekday: "long"});
        const day = today.getDate();
        const month = today.toLocaleString("en", {month: "long"});
        const currentDate = `${weekday} ${day} ${month}`;
        setDate(currentDate);
    }

    return date;
}
