import React, { useEffect, useRef, useState } from 'react';
import './weather.css';
import search_icon from './../assets/search.png';
import clear_icon from './../assets/clear.png';
import cloud_icon from './../assets/cloud.png';
import drizzle_icon from './../assets/drizzle.png';
import humidity_icon from './../assets/humidity.png';
import rain_icon from './../assets/rain.png';
import snow_icon from './../assets/snow.png';
import wind_icon from './../assets/wind.png';

function Weather() {
    const inputRef = useRef();
    const [weatherdata, setWeatherData] = useState({
        humidity: null,
        windspeed: null,
        temperature: null,
        location: '',
        icon: clear_icon,
    });
    const [error, setError] = useState('');

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
            setError('');
        } catch (error) {
            setError(error.message);
            setWeatherData({
                humidity: null,
                windspeed: null,
                temperature: null,
                location: '',
                icon: clear_icon,
            });
        }
    };

    useEffect(() => {
        search("London");
    }, []);

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search city' />
                <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
            </div>
            {error && <p className='error'>{error}</p>}
            <div>
                <img src={weatherdata.icon} alt="Weather Icon" className='weather-icon' />
                <p className='temperature'>{weatherdata.temperature !== null ? `${weatherdata.temperature}°C` : 'N/A'}</p>
                <p className='location'>{weatherdata.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="Humidity" />
                        <div>
                            <p>{weatherdata.humidity !== null ? weatherdata.humidity : 'N/A'}</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="Wind Speed" />
                        <div>
                            <p>{weatherdata.windspeed !== null ? `${weatherdata.windspeed} km/h` : 'N/A'}</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;