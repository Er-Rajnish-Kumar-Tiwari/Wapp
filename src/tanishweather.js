import React, { useState } from 'react';
import './tanishwt.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

export default function Tanishweather() {
    let [city, setcity] = useState('');
    let [wdata, setwdata] = useState(null);

    function getData(event) {
        event.preventDefault();

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
            .then((res) => res.json())
            .then((finaldata) => {
                if (finaldata.cod === '404') {
                    setwdata(undefined);
                } else {
                    setwdata(finaldata);
                }
            });
        setcity('');
        toast.success("Get weather successfully!");
    }

    return (
        <div>
            <div className='cont'>
                <h1 style={{color:"maroon",textShadow:'2px 2px 4px rgba(0, 0, 0, 0.2)'}}><b>Tanish Learning Center</b></h1>
                <h3 style={{color:'brown',marginBottom:"30px"}}><b>Weather App</b></h3>
                <input type='text' placeholder='Enter City Name!' value={city} onChange={(e) => setcity(e.target.value)} />
                <button onClick={getData}>Search</button>
            </div>

            <div className='details'>
                {wdata ? (
                    <>
                        <h2 className='n2'><b>Weather of {wdata.name}-({wdata.sys.country})</b></h2>
                        <img src={`http://openweathermap.org/img/w/${wdata.weather[0].icon}.png`} alt='img' style={{height:'150px'}}></img>
                        <h4><b>Current_Temp :- {wdata.main.temp}°C</b></h4>
                        <h4><b>Feels_Like :- {wdata.main.feels_like}°C</b></h4>
                        <h4><b>Max_Temp :- {wdata.main.temp_max}°C</b></h4>
                        <h4><b>Min_Temp :- {wdata.main.temp_min}°C</b></h4>
                    </>
                ) : (
                    <h2 className='n2'>Enter a valid city </h2>
                )}
            </div>
            <ToastContainer/>

        </div>
    );
}
