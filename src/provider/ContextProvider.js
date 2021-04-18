// A simple hook based store
// We can use this to pass detached states
// around and not have to worry about prop-drilling
import React, { useState } from 'react';
import Context from '../context/StoreContext';
import responseTemplate from '../response-template.json';

const StoreContext = ({ children }) => {

	// States used in store for global
	// location handling
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [country, setCountry] = useState('');
	const [name, setName] = useState('');
	
	// Data will come from API request
	const store = {
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
		data: responseTemplate,
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