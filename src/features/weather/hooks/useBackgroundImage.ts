import { useState, useEffect } from 'react';
import night from '../../../images/night.webp';
import morning from '../../../images/morning.webp';
import afternoon from '../../../images/afternoon.webp';
import evening from '../../../images/evening.webp';

export function useBackgroundImage(): string {
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        setBackgroundImage(hour < 6 || hour >= 20 ? night : hour < 12 ? morning : hour < 17 ? afternoon : evening);
    }, []);

    return backgroundImage;
}
