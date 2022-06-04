import React, { useState } from "react";
import '../Styles/Weather.css';

function WeatherContainer() {
    const [searchQuery, setSearchQuery] = useState();

    //event handler for zipcode input
    function updateSearchQuery(event) {
        setSearchQuery(event.target.value);
    }

    return (
        <div className="weather-container">
            <header className="weather-header">
                <h1>Weather Kids!</h1>
                <div id="search">
                    <input type="text" className="search-input" placeholder="Enter Your Zipcode" onChange={updateSearchQuery} />
                    <button className="material-icons">search</button>
                </div>
            </header>
        </div>
    )
}

export default WeatherContainer;