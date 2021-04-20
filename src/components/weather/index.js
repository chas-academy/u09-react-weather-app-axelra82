/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../../context/StoreContext';
import { Line, Bar } from 'react-chartjs-2';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Location from '../search';
import Detail from './details';
import Hourly from './hourly';

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

	const getTime = (timestamp = null, getDate = false, onlyHour = false) => {

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
					weekday: 'short'
				}

			);

			return getDate ?
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
	}, []);
	
	// const lineChartLabels = [];
	// const lineChartValues = [];
	// hourly.forEach((o,i) => {
		
	// 	if(i < 6){
	// 		let label;
	// 		if(i === 0){
	// 			label = 'NOW';
	// 		}else{
	// 			label = getTime(o.dt, false, true);
	// 		}
	// 		lineChartLabels.push(label);
	// 		lineChartValues.push(tempRound(o.temp));
	// 	}
	// });

	// // ChartJS datalabels plugin
	// Chart
	// .plugins
	// .register(ChartDataLabels);
	// Chart
	// .helpers
	// .merge(
	// 	Chart.defaults.global.plugins.datalabels, {
	// 		color: '#fff',
	// 		anchor: 'start',
	// 		align: 'end',
	// 		clamp: true,
	// 		font: {
	// 			size: 18,
	// 		},
	// 		formatter: function(value) {
	// 			return `${value}\u00b0${unit.symbol}`;
	// 		},
	// 	},
	// );

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
					<div className="ts-small fw-">
						{weatherDescription}
					</div>
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
					title: 'feels like',
					value: tempRound(currentFeelLike),
					unit: `\u00b0${unit.symbol}`
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
					value: currentUvIndex
				}} />

				<Detail content={{
					icon: 'raindrops',
					title: 'Dew point',
					value: currentDewPoint,
					unit:`\u00b0${unit.symbol}`
				}} />
			</div>
			
			<article id='weather-container-hourly' className='mt-1'>
				<h1 className='ts-medium fw-regular text-left'>12 hour forcast</h1>
				<section id='horizontal-scroll-wrapper'>
				{
					hourly.map((item, idx) => {
						// console.log(item);
						const { dt: itemTime, temp: itemTemp, weather: itemWeather } = item;
						const { id: itemWeatherId, main: itemDescription } = itemWeather[0];
						return <Hourly key={`hourly-${idx}`} data={{
							time: idx === 0 ? 'NOW' : getTime(itemTime, false, true),
							temp: `${tempRound(itemTemp)}\u00b0${unit.symbol}`,
							icon: `wi wi-owm-${tod}-${itemWeatherId}`,
							description: itemDescription,
						}} />;
					})
				}
				</section>
			</article>

			{/* <Line id='hourly-line-chart' data={{
				labels: lineChartLabels,
				datasets: [
					{
						data: lineChartValues,
						fill: false,
						borderColor: 'rgba(255, 255, 255, 0.5)',
						borderWidth: 1,
						borderDash: [3, 5],
						pointBorderWidth: 9,
						pointbORDERColor: 'rgba(255, 255, 255, .1)',
						pointBackgroundColor: '#fff',
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(255, 255, 255, 0.35)',
						pointHoverBorderColor: '#fff',
						pointHoverBorderWidth: 2,
						pointRadius: 3,
						pointHitRadius: 20,
					},
				],
			}}
			height={75}
			options={{
				layout: {
					padding: {
						left: 20,
						right: 20,
						top: 25,
					}
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: false
				},
    			scales: {
					yAxes: [
						{
							gridLines: {
								display: false,
							},
							ticks: {
								display: false,
								beginAtZero: true
							},
						},
					],
					xAxes: [
						{
							gridLines: {
								// display:false,
								color: 'rgba(255,255,255,0.25)',
								drawBorder: false,
								borderColor: 'rgba(255,255,255,0.25)',
								drawOnChartArea: true,
							},
							ticks: {
								fontColor: '#fff',
							},
						},
					],
				},
			}}

			/> */}
		</section>
	);
}