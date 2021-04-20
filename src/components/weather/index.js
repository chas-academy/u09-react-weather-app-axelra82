/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect } from 'react';
import StoreContext from '../../context/StoreContext';

import Detail from './details';
import Hourly from './hourly';
import Daily from './daily';

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
			weatherData: {
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
				hourly,
				daily
			}
		}
	} = useContext(StoreContext);

	const unit = unitOptions.find(unit => unit.value === currentUnit);

	const getTime = (timestamp = null, getDate = false, onlyHour = false, fullDay = false) => {

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
			
			const timeHour = date
			.toLocaleTimeString(
				locale,
				{
					hour: '2-digit',
				}
			).toLowerCase();

			const day = date
			.toLocaleDateString(
				locale,
				{
					weekday: fullDay ? 'long' : 'short',
				}
			);

			return getDate ?
				fullDay ?
					day
				:
					`${day}, ${time}`
			:
				onlyHour ?
					timeHour
				:
					time
			;
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
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

			<article id='weather-container-mid'>

				<h1 id='icon-title' className='h4 fw-regular'>
					{weatherTitle} <i className={`wi wi-owm-${tod}-${weatherId}`}></i>
					<div className="ts-small fw-">
						{weatherDescription}
					</div>
				</h1>

				<section id='temp'>

					<h2 id='temp-main'>
						{tempRound(currentTemp)}&deg;
					</h2>

					<div id='temp-hi-lo' className='ts-medium'>
						<div id='temp-hi'>
							H: {tempRound(todayMaxTemp)}&deg;
						</div>
						<div id='temp-lo'>
							L: {tempRound(todayMinTemp)}&deg;
						</div>
					</div>
				</section>
			</article>

			<section id="weather-sunrise-sunset">
				<div>
					<i className='wi wi-horizon-alt'></i>
					{getTime(sunrise)}
				</div>
				<div>
					<i className='wi wi-horizon'></i>
					{getTime(sunset)}
				</div>
			</section>

			<div id='weather-container-extras'>
				<Detail content={{
					icon: 'thermometer',
					title: 'Feels like',
					value: tempRound(currentFeelLike),
					unit: `\u00b0`
				}} />

				<Detail content={{
					icon: 'strong-wind',
					title: 'Wind',
					value: currentWindSpeed,
					unit: unit.speed
				}} />

				<Detail content={{
					icon: 'humidity',
					title: 'Humidity',
					value: currentHumidity,
					unit: '%'
				}} />

				<Detail content={{
					icon: 'barometer',
					title: 'Pressure',
					value: currentPressure,
					unit: 'hPa'
				}} />

				<Detail content={{
					icon: 'day-sunny',
					title: 'UV index',
					value: tempRound(currentUvIndex)
				}} />

				<Detail content={{
					icon: 'raindrops',
					title: 'Dew point',
					value: currentDewPoint,
					unit:`\u00b0`
				}} />
			</div>
			
			<article id='weather-container-hourly' className='mt-1'>
				<h1 className='ts-medium fw-regular title-line'>12 hour forcast</h1>
				<section id='horizontal-scroll-wrapper'>
				{
					hourly.map((item, idx) => {
						const {
							dt: itemTime,
							temp: itemTemp,
							weather: itemWeather
						} = item;
						const {
							id: itemWeatherId,
						} = itemWeather[0];
						return <Hourly key={`hourly-${idx}`} data={{
							time: idx === 0 ? 'NOW' : getTime(itemTime, false, true),
							temp: `${tempRound(itemTemp)}\u00b0`,
							icon: `wi wi-owm-${tod}-${itemWeatherId}`,
						}} />;
					})
				}
				</section>
			</article>
			
			<article id='weather-container-daily' className='mt-3'>
				<h1 className='ts-medium fw-regular title-line'>7 day forcast</h1>
				{
					daily.map((item, idx) => {
						// Skip first item, that's today
						if(idx > 0){
							
							const {
								dt: itemTime,
								temp: {
									min: itemMinTemp,
									max: itemMaxTemp,
								},
								weather: itemWeather,
								pop, // Probability of Precipitation
							} = item;
							const {
								id: itemWeatherId,
							} = itemWeather[0];
							return <Daily key={`daily-${idx}`} data={{
								day: getTime(itemTime, true, false, true),
								temp: {
									min: `${tempRound(itemMinTemp)}`,
									max: `${tempRound(itemMaxTemp)}`,
								},
								icon: `wi wi-owm-${tod}-${itemWeatherId}`,
								pop: tempRound(pop),
							}} />;
						}
					})
				}
			</article>
		</section>
	);
}