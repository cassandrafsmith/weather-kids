import React, { useState } from 'react';
import '../Styles/WeatherContainer.css';
import WeatherDisplay from './WeatherDisplay';
import ImageDisplay from './ImageDisplay';

function WeatherContainer() {
    const apiKey = process.env.REACT_APP_API_KEY;    
    const [searchInfo, setSearchInfo] = useState('');       
    const [weatherData, setWeatherData] = useState({        
        temp: null,
        city: null,
        descript: null,
        icon: null,
        id: null
    });   
    const [isValidZip, setIsvalidZip] = useState(true);

    //validate zip code
    const validateZip = (zipcode) => {
        let regex = /^[0-9]{5}$/;
        return regex.test(zipcode);
    }

    //event handler for zipcode input
    const updateSearchInfo = (event) => {       
        let zipcode = event.target.value;            
        let isValid = validateZip(zipcode);
        console.log(isValid);       
        setSearchInfo(zipcode);

        if(isValid || zipcode === ''){            
            setIsvalidZip(true);
        } else {
            setIsvalidZip(false);
        }
    }
    //handles 'enter' key presses
    const enterKeyPress = (event) => {
        if(event.key === 'Enter'){
            console.log('enter pressed');
            getWeatherData();
        }
        //add functionality for user deleting the zipcode...
    }

    //event handler for button click & API call
    const getWeatherData = () => {        
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchInfo},us&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => setWeatherData({
            temp: tempChange(data.main.temp),
            city: data.name,
            descript: data.weather[0].description,
            icon: data.weather[0].icon,
            id: data.weather[0].id
        }));        
    }

    //change the incoming kelvin temp to Fahrenheit
    const tempChange = (temp) => {
        return Math.floor((temp - 273.15) * 1.8 + 32);
    } 

    return (
        <div className="weather-container">
            <header className="weather-header">
                <h1>Weather Kids</h1>
                <div id="search">
                    <input 
                        type="text"
                        className="search-input" 
                        placeholder="Zipcode" 
                        onChange={updateSearchInfo} 
                        onKeyPress={enterKeyPress}                        
                    />
                    <button className="material-icons" onClick={getWeatherData} >search</button>
                </div>
                <div id= "zip-error" >
                    {!isValidZip ? <p className="validation-message">Uh Oh! Incorrect zipcode!</p> : ''}
                </div>
            </header>
            <div className="weather-info">
                {weatherData.icon === null ? (
                    '') : <ImageDisplay id={weatherData.id} />}            
                {weatherData.temp === null ? (
                    <p>Let's Find Your Weather! <i className="material-icons">wb_sunny</i></p>) : <WeatherDisplay data={weatherData} /> }            
            </div>
        </div>
    )
}

export default WeatherContainer;