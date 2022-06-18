import React, { useState } from 'react';
import '../Styles/Weather.css';
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
        id: null, 
        tzone: null,
        name: null
    });   
    const [time, setTime] = useState({
        time: 11        
    });
    const [isValidZip, setIsvalidZip] = useState(true);
    const [isNight, setIsNight] = useState(false);

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
    }

    //event handler for button click & API call
    const getWeatherData = () => {     
        console.log('in getWeather()')   
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchInfo},us&appid=${apiKey}`)        
        .then(response => response.json())
        .then(data => setWeatherData({
            temp: tempChange(data.main.temp),
            city: data.name,            
            descript: data.weather[0].description,
            icon: data.weather[0].icon,
            id: data.weather[0].id,            
            tzone: data.timezone,
            name: data.name
        }));     
        console.log('after getWeatherData()')        
        getTime(); 
    }

    //change the incoming kelvin temp to Fahrenheit
    const tempChange = (temp) => {
        return Math.floor((temp - 273.15) * 1.8 + 32);
    } 

    //eventually change incoming kelvin temp to celcius here and allow user to choose.                    -----------------------------------------------------------

    //calculate time at the searched location
    const getTime = () => {  
        let date = new Date();

        const userTime = date.getTime();
        const userOffset = date.getTimezoneOffset() * 60000;
        const utc = userTime + userOffset;
        const searchOffset = weatherData.tzone * 1000;
        const searchTime = utc + searchOffset;

        const newTime = new Date(searchTime);
        const hour = newTime.getHours();                    
          
        checkNight(hour);      
    }

    //funtion to find if current time is night time
    //eventually change 5 and 19 to actual sunrise and sunset times.
    const checkNight = (time) =>{
        console.log(isNight);
        if (time <= 5 || time >= 19){
            setIsNight(true);
        } 
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
                    '') : <ImageDisplay id={weatherData.id} night={isNight} />}            
                {weatherData.temp === null ? (
                    <p>Let's Find Your Weather! <i className="material-icons">wb_sunny</i></p>) : <WeatherDisplay data={weatherData} /> }            
            </div>
        </div>
    )
}

export default WeatherContainer;