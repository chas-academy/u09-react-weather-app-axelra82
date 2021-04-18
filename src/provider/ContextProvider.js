// A simple hook based store
// We can use this to pass detached states
// around and not have to worry about prop-drilling
import React, { useState, useEffect } from 'react';
import Context from '../context/StoreContext';
import responseTemplate from '../response-template.json';

const StoreContext = ({ children }) => {

	// States used in store for global
	// location handling
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	
	// Default location is always 0
	// Data will come from API request
	const store = {
		location: {
			lat,
			lon,
			setLat,
			setLon
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