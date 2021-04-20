// A simple hook based store
// We can use this to pass detached states
// around and not have to worry about prop-drilling
import React, { useState } from 'react';
import Context from '../context/StoreContext';
import responseTemplate from '../response-template.json';
import { getLocal } from '../helpers';

const StoreContext = ({ children }) => {

	// States used in store for global
	// location, metric and data handling
	// @Units: metric | imperial | standard*
	// * if no unit value is present durring api call standard will be used
	const [unit, setUnit] = useState({
		// Set unit according to local storage
		// i.e. default to metric else get value
		current: getLocal().unit,
		options: [
			{
				value: 'metric',
				symbol: 'C',
				speed: 'm/s',
			},
			{
				value: 'imperial',
				symbol: 'F',
				speed: 'mph',
			}
		]
	});
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	
	const [country, setCountry] = useState('');
	const [name, setName] = useState('');
	
	const [tod, setTod] = useState(null);
	const [gradient, setGradient] = useState(null);
	const [weatherData, setWeatherData] = useState(null);

	// Data will come from API request
	const store = {
		unit,
		setUnit,
		location: {
			lat,
			lon,
			setLat,
			setLon,
			country,
			setCountry,
			name,
			setName,
		},
		classes: {
			tod,
			setTod,
			gradient,
			setGradient,
		},
		weatherData,
		setWeatherData,
	};

	return (
		<Context.Provider
			value={{ store }}
		>
			{children}
		</Context.Provider>
	)
}

export default StoreContext;