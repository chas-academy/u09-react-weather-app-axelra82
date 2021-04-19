/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../../context/StoreContext';

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
				lat,
				lon,
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

	const getTime = (timestamp) => {
		// new Date(store.data.current.dt * 1000).toLocaleTimeString()
		return typeof timestamp !== 'undefined' ?
		new Date(timestamp * 1000).toUTCString()
		:
		null;
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
		id: weatherId, //800,
		main: weatherTitle, //Clear
		description: weatherDescription, //clear sky
		icon: weatherIcon, //01d
	} = currentWeatherDetails[0];

	return(
		<section className='container'>
			<article className='card main gradient day clear'>
				<h1>{locationName}, {locationCountry}</h1>
				<div className="text-small">
					<p>
						Lat: {Math.round(lat * 100)/100}, Lon: {Math.round(lon * 100)/100}
					</p>

					<p>
						As of {getTime(currentTime)}
					</p>
				</div>
				<h1>{weatherTitle}</h1>
				<div>
					<i className={`wi wi-owm-${weatherId}`}></i>
				</div>
				<h2>
					{currentTemp}&deg; {unit.symbol}
				</h2>
				<div className="text-small">
					Feels like {currentFeelLike} &deg;{unit.symbol}        
				</div>
				<h4>
					{todayMinTemp}&deg; {unit.symbol} | {todayMaxTemp}&deg; {unit.symbol}
				</h4>
				
					
				<div className="main extras">
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
					<div>
						<i className='wi wi-horizon-alt'></i>
						Sunrise {getTime(sunrise)}
					</div>
					<div>
						<i className='wi wi-horizon'></i>
						Sunset {getTime(sunset)}
					</div>
				</div>
			</article>
		</section>
	);
}