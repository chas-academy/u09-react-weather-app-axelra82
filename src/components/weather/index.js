/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect } from 'react';
import StoreContext from '../../context/StoreContext';
import Location from '../search';

import './style.scss';

export default () => {
	
	const {
		store:{
			unit: {
				current: currentUnit,
				options: unitOptions,
			},
			location: {
				name: locationName,
				country: locationCountry,
			},
            classes: {
                tod,
                setTod,
                setGradient
            },
			data: {
				current: {
					dt: currentTime,
					temp: currentTemp,
					feels_like: currentFeelLike,
					wind_speed: currentWindSpeed,
					pressure: currentPressure,
					humidity: currentHumidity,
					dew_point: currentDewPoint,
					uvi: currentUvIndex,
					weather: currentWeatherDetails
				},
				daily
			}
		}
	} = useContext(StoreContext);
	
	const unit = unitOptions.find(unit => unit.value === currentUnit);

	const getTime = (timestamp = null, getDate = false) => {
		
		if(typeof timestamp !== 'undefined'){
			const date = new Date(timestamp * 1000);
			const locale = 'en-US';

			const time = date
			.toLocaleTimeString(
				locale,
				{
					hour: '2-digit',
					minute: '2-digit'
				}
			).toLowerCase();

			const day = date
			.toLocaleDateString(
				locale,
				{
					weekday: 'short'
				}

			);

			return getDate ? `${day}, ${time}` : time;
		}

		return null;
	}

	const today = daily[0];
	const {
		sunrise,
		sunset,
		temp: {
			min: todayMinTemp,
			max: todayMaxTemp,
		}
	} = today;

	const {
		id: weatherId,
		main: weatherTitle,
		description: weatherDescription,
		icon: weatherIcon,
	} = currentWeatherDetails[0];
    
    // Use weather icon in response to determine if it's day or night
    // Where d represents 'day' and n represents 'night'    
    const getTod = weatherIcon.includes('d') ? 'day' : 'night';

    const tempRound = (temp) => {
        return Math.floor(temp);
    }

    useEffect(() => {
        setTod(getTod);
        setGradient(weatherTitle.toLowerCase());
    }, []);

	return(
		<section id='weather-container'>
            <article id='weather-container-top' className="mb-3">
                <span className="text-small fw-thin">{locationCountry}</span>
                <h1 className='mb-0 h2'>
                    {locationName}
                </h1>
                <div className='fw-thin ts-medium'>
                    {getTime(currentTime, true)}
                </div>
            </article>

            {/* <Location /> */}

            <article id='weather-container-mid'>
            
                <h1 id='icon-title' className='h4 fw-regular'>
                    {weatherTitle} <i className={`wi wi-owm-${tod}-${weatherId}`}></i>
                </h1>
                
                <section id='temp'>
                    
                    <h2 id='temp-main'>
                        {tempRound(currentTemp)}&deg;{unit.symbol}
                    </h2>

                    <div id='temp-hi-lo' className='ts-medium fw-thin'>
                        <div id='temp-hi'>
                            <i className='wi wi-direction-up'></i> {tempRound(todayMaxTemp)}&deg;{unit.symbol}
                        </div>
                        <div id='temp-lo'>
                            <i className='wi wi-direction-down'></i> {tempRound(todayMinTemp)}&deg;{unit.symbol}
                        </div>
                    </div>
                </section>
            </article>

            <div>
                Feels like {currentFeelLike} &deg;{unit.symbol}. {weatherDescription}
            </div>
            

            <div>
                <div>
                    <i className='wi wi-horizon-alt'></i>
                    Sunrise {getTime(sunrise)}
                </div>
                <div>
                    <i className='wi wi-horizon'></i>
                    Sunset {getTime(sunset)}
                </div>
            </div>

            <div className='main extras'>
                <div>
                    <i className='wi wi-strong-wind'></i>
                    Wind {currentWindSpeed} {unit.speed}
                </div>
                <div>
                    <i className='wi wi-humidity'></i>
                    Humidity {currentHumidity}%
                </div>
                <div>
                    <i className='wi wi-barometer'></i>
                    Pressure {currentPressure}hPa
                </div>
            </div>
        </section>
	);
}