import React from 'react';
import  '../Styles/WeatherDisplay.css';

function WeatherDisplay(props) {
    const {temp, city, id } = props.data;

    const getDescription = (props) => {
        if(props >= 200 && props < 300){
            return 'and Stormy';
        } 
        else if (props >= 300 && props < 600) {
            return 'and Rainy';
        }
        else if (props >= 600 && props < 701) {
            return 'and Snowy';
        }
        else if (props >= 701 && props < 800 && props !== 771) {
            return 'and Cloudy';
        }
        else if (props === 771) {
            return 'and Windy';
        }
        else if (props === 800) {
            return 'and Sunny';
        } 
        else if (props >= 801 && props <= 804) {
            return 'and Lightly Cloudy';
        }        
        else {
            return ''; 
        }
    }
    return(
        <div className="weather-display">
            <p className="temp">{`It's ${temp}°F ${getDescription(id)} in ${city}!`}</p>                               
        </div>
    )
}

export default WeatherDisplay;