import { useEffect, useState } from 'react';
import night from "../assets/images/night.webp";
import morning from "../assets/images/morning.webp";
import afternoon from "../assets/images/afternoon.webp";
import evening from "../assets/images/evening.webp";

export function useBackgroundImage() {
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();

        if (hour < 6 || hour >= 20) {
            setBackgroundImage(night);
        } else if (hour < 12) {
            setBackgroundImage(morning);
        } else if (hour < 17) {
            setBackgroundImage(afternoon);
        } else {
            setBackgroundImage(evening);
        }
    }, []);

    return backgroundImage;
}
