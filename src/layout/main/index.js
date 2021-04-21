/* eslint-disable import/no-anonymous-default-export */
import { useContext, useEffect } from 'react';
import StoreContext from '../../context/StoreContext';
import axios from 'axios';

import { Header, Footer } from '../';
import Weather from '../../components/weather';

import './style.scss';

export default () => {
	
	const {
		store: {
			searchLocation,
			unit:{
				current: currentUnit
			},
			location: {
				lat,
				lon,
				setLat,
				setLon,
				setCountry,
				setName,
			},
			classes: {
                tod,
                gradient
            },
			weatherData,
			setWeatherData,
		}
	} = useContext(StoreContext);

	const locationName = async() => {
					
		const settings = {
			method: 'post',
			url: '/.netlify/functions/owm-location',
			data: {
				direction: 'reverse',
				search: {
					lat,
					lon
				}
			}
		};
		
		const getLocationName = await axios(settings);
		const firstResult = getLocationName.data;

		setCountry(firstResult.country);
		setName(firstResult.name);
	}

	// useEffect for component life cycle behavior
	useEffect(() => {
		if(!searchLocation){
			// Test for browser geolocation support
			if (navigator.geolocation) {
		
				// Success function
				const geoSuccess = position => {
					setLat(position.coords.latitude);
					setLon(position.coords.longitude);
				}
		
				// Error function
				const geoError = error => {
					// Will show if user blocks location tracking
					if(error.code === error.PERMISSION_DENIED){
						alert('Please allow application to view your current position for precise location matching. You may also use the location search function.');
					}
				}

				// Browser supports geoloaction
				// Get location in success function
				navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

				if(lat && lon){
					locationName();
				}
			}else{
				// Alert user that browser lacks support for geolocation
				alert('Geolocation does not appear to be supported in this browser.');
			}
		}

		// If we have latitude and longitude values we can get weather data

		/*******************
		 * PRODUCTION
		 * Use response template durring dev. To many unnecessary live API calls
		*******************/
		if(lat && lon){
			locationName();
			
			const getWeatherData = async() => {
				// Post request settings for data
				// Body contains lat and lon values
				const settings = {
					method: 'post',
					url: '/.netlify/functions/owm-data',
					data: {
						lat,
						lon,
						unit: currentUnit,
					}
				};
				
				const response = await axios(settings);
				console.log(response.data);
				setWeatherData(response.data);
			}

			getWeatherData();
		}

		// Only resubcscribe on change in variables
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lat, lon, currentUnit]);

	return(
		<section id="gradient-container" className={`gradient ${tod} ${gradient}`}>
			<Header />
			
			<main className='container'>
				{weatherData && <Weather /> }
			</main>

			<Footer />
		</section>
	);
}