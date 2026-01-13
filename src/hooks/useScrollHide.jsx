import { useState, useEffect } from 'react';
import React from 'react';  

function useScrollHide() {

const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const controlHeader = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
    };
    useEffect(() => {
        window.addEventListener('scroll', controlHeader);
        return () => {
            window.removeEventListener('scroll', controlHeader);
    };
    }, [lastScrollY]);
    return isVisible;
}
export default useScrollHide;
