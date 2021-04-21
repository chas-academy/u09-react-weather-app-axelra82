/* eslint-disable import/no-anonymous-default-export */
import { useContext, useEffect, useState } from 'react';
import StoreContext from '../../context/StoreContext';
import axios from 'axios';

import './style.scss';

export default () => {

	const {
		store: {
			setSearchLocation,
			setMenuOpen,
			location: {
				setLat,
				setLon,
				setCountry,
				setName,
			}
		}
	} = useContext(StoreContext);

	// useEffect(() => {
	// 	const locationName = async() => {
	// 		// Make static durring dev
	// 		// const settings = {
	// 		// 	method: 'post',
	// 		// 	url: '/.netlify/functions/openweathermap',
	// 		// 	data: {
	// 		// 		direction: 'reverse',
	// 		// 		search: {
	// 		// 			lat,
	// 		// 			lon
	// 		// 		}
	// 		// 	}
	// 		// };
			
	// 		// const getLocationName = await axios(settings);
	// 		// const firstResult = getLocationName.data;
			
	// 		// setCountry(firstResult.country);
	// 		// setName(firstResult.name);
			
	// 		setCountry('Sweden');
	// 		setName('Stockholm');
	// 	}

	// 	const geoSuccess = position => {
	// 		setLat(position.coords.latitude);
	// 		setLon(position.coords.longitude);
	// 	}

	// 	const geoError = error => {
	// 		if(error.code === error.PERMISSION_DENIED){
	// 			alert('Please allow application to view your current position for precise location matching. You may also use the location search function.');
	// 		}
	// 	}

	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

	// 		if(lat && lon){
	// 			locationName();
	// 		}
	// 	}else{
	// 		alert('Geolocation does not appear to be supported in this browser.');
	// 	}

	// 	// Default values, i.e. no input
	// 	if(lat === 0 && lon === 0){

	// 	}

	// 	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	// }, [lat,lon]);

	const [noResults, setNoResults] = useState(false);
	
	const getGeoLocation = async(str) => {

		const settings = {
			method: 'post',
			url: '/.netlify/functions/owm-location',
			data: {
				direction: 'direct',
				search:{
					str
				}
			}
		};
		
		const response = await axios(settings);
		return response.data;
	}

	const doSearch = async (e) => {
		// Prevent form from default action
		e.preventDefault();
		const searchField = e.target.childNodes[0];
		const str = searchField.value;
		
		console.log(str);
		
		if(str) {
			setSearchLocation(true);
			const location = await getGeoLocation(str);
			console.log('------IN SEARCH------');
			console.log(location);
			console.log('------------');

			if(typeof location !== 'undefined' || location.length !== 0){
				const {lat, lon, name, country } = location[0];
				if(location.length > 1){
					// Found more
					console.log('Also found more');
					// We got exactly one hit
					setLat(lat);
					setLon(lon);
					setCountry(country);
					setName(name);
					setMenuOpen(false);
				}else{
					// We got exactly one hit
					setLat(lat);
					setLon(lon);
					setCountry(country);
					setName(name);
					setMenuOpen(false);
				}
			}else{
				setNoResults(true);
			}
			
		}else{
			// Notify about no string	
		}

		
	}

	const clearNotice = () => {
		// Reset any potential previous warnings
		setNoResults(false);
	}

	return(
		<>
			<form onFocus={clearNotice} onSubmit={doSearch} id='location-search'>
				<input name='searchString' type='text' placeholder='Location' />
				<button type='submit'>Search</button>
			</form>

			{/* Inform user that we couldn't find anything for that search string */}
			{noResults &&
				<article className='text-center mt-2'>
					<h1 className='h5'>Sorry, we couldn't find any location matcing that name</h1>
				</article>
			}
		</>
	);
}