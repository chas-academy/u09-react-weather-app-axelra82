// A simple hook based store
// We can use this to pass detached states
// around and not have to worry about prop-drilling
import React, { useState } from 'react';
import Context from '../context/StoreContext';

const StoreContext = ({ children }) => {

	const [lat, setLat] = useState(0);
	const [long, setLong] = useState(0);
	const [state, setState] = useState({
		active: Boolean,
		message: String,
	});

	// An object with our default states for our store context
	const store = {
		lat,
		setLat,
		long,
		setLong,
		state,
		setState,
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