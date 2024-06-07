import { useState, useEffect } from 'react';

export function useDate(): string {
    const [date, setDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const weekday = today.toLocaleString('en', { weekday: 'long' });
        const day = today.getDate();
        const month = today.toLocaleString('en', { month: 'long' });
        const currentDate = `${weekday} ${day} ${month}`;
        setDate(currentDate);
    }, []);

    return date;
}
