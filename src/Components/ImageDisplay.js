import React from 'react';
import '../Styles/Weather.css';
import cloudy300 from './images/cloudy300.svg';
import partcloudy300 from './images/partcloud300.svg';
import rain300 from './images/rain300.svg';
import snow300 from './images/snow300.svg';
import storm300 from './images/storm300.svg';
import sunny300 from './images/sunny300.svg';
import windy300 from './images/windy300.svg';
import moon300 from './images/moon300.svg';

function ImageDisplay(props) {
    console.log(props.night) 
    console.log(props.id)       

    const getImage = (props) => {
        console.log(`in getImage. ${props.night}`)
        
        if(props.night === true){
            return <img src={moon300} alt="smiling child holding a large grey moon" />;
        }
        else if(props.id >= 200 && props.id < 300 && !props.night){
            return <img src={storm300} alt="smiling child holding a large yellow lightening bolt" />;
        } 
        else if (props.id >= 300 && props.id < 600  && !props.night) {
            return <img src={rain300} alt="smiling child holding a large light blue raindrop" />;
        }
        else if (props.id >= 600 && props.id < 701  && !props.night) {
            return <img src={snow300} alt="smiling child holding a large white snowflake" />;
        }
        else if (props.id >= 701 && props.id < 800 && props.id !== 771  && !props.night) {
            return <img src={cloudy300} alt="smiling child holding a large grey cloud" />;
        }
        else if (props.id === 771  && !props.night) {
            return <img src={windy300} alt="smiling child holding a large windy breeze" />;         
        }
        else if (props.id === 800  && !props.night) {
            return <img src={sunny300} alt="smiling child holding a large bright yellow sun" />;
        } 
        else if (props.id >= 801 && props.id <= 804 && !props.night) {
            return <img src={partcloudy300} alt="smiling child holding a large white cloud" />;
        }        
        else{
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
            {getImage(props)}
        </div>
    )
}

export default ImageDisplay;