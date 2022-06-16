import React from 'react';
import '../Styles/Weather.css';
import cloudy300 from './images/cloudy300.svg';
import partcloudy300 from './images/partcloud300.svg';
import rain300 from './images/rain300.svg';
import snow300 from './images/snow300.svg';
import storm300 from './images/storm300.svg';
import sunny300 from './images/sunny300.svg';
import windy300 from './images/windy300.svg';

function ImageDisplay(props) {

    const getImage = (props) => {
        if(props >= 200 && props < 300){
            return <img src={storm300} alt="smiling child holding a large yellow lightening bolt" />;
        } 
        else if (props >= 300 && props < 600) {
            return <img src={rain300} alt="smiling child holding a large light blue raindrop" />;
        }
        else if (props >= 600 && props < 701) {
            return <img src={snow300} alt="smiling child holding a large white snowflake" />;
        }
        else if (props >= 701 && props < 800 && props !== 771) {
            return <img src={cloudy300} alt="smiling child holding a large grey cloud" />;
        }
        else if (props === 771) {
            return <img src={windy300} alt="smiling child holding a large windy breeze" />;         
        }
        else if (props === 800) {
            return <img src={sunny300} alt="smiling child holding a large bright yellow sun" />;
        } 
        else if (props >= 801 && props <= 804) {
            return <img src={partcloudy300} alt="smiling child holding a large white cloud" />;
        }        
        else {
            return( 
                <div className='image-error'>
                    <p>Ooops!</p>
                    <p>No Weather Image to Display!</p>
                </div>
            );
        }
    }
    
    return(
        <div className="image">            
            {getImage(props.id)}
        </div>
    )
}

export default ImageDisplay;