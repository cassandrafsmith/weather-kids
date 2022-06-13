import React from 'react';
import  '../Styles/WeatherDisplay.css';

function WeatherDisplay(props) {
    const {temp, city } = props.data;

    return(
        <div className="weather-display">
            <p className="temp">{`It's ${temp}°F `}<p className="city">{`in ${city}!`}</p></p>            
        </div>
    )
}

export default WeatherDisplay;