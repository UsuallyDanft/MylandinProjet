import React from 'react';
import './HomePage.css';

function HomePage () {
    return(
        <div className='home-container'>
            <div className='home-contentA'>
                <span className='home-text'>Welcome to Our Website!</span>
            </div>
            <div className='home-contentB'>
                <span className='home-text'>Welcome to Our Website 2!</span>
            </div>
            <div className='home-contentC'>
                <span className='home-text'>Welcome to Our Website 2!</span>
            </div>
        </div>
    );
}

export default HomePage;