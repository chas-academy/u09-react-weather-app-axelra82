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
		}
	} = useContext(StoreContext);

	useEffect(() => {
		const locationName = async() => {
			// Make static durring dev
			// const settings = {
			// 	method: 'post',
			// 	url: '/.netlify/functions/openweathermap',
			// 	data: {
			// 		direction: 'reverse',
			// 		search: {
			// 			lat,
			// 			lon
			// 		}
			// 	}
			// };
			
			// const getLocationName = await axios(settings);
			// const firstResult = getLocationName.data;
			
			// setCountry(firstResult.country);
			// setName(firstResult.name);
			
			setCountry('Sweden');
			setName('Stockholm');
		}

		const geoSuccess = position => {
			setLat(position.coords.latitude);
			setLon(position.coords.longitude);
		}

		const geoError = error => {
			if(error.code === error.PERMISSION_DENIED){
				alert('Please allow application to view your current position for precise location matching. You may also use the location search function.');
			}
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

			if(lat && lon){
				locationName();
			}
		}else{
			alert('Geolocation does not appear to be supported in this browser.');
		}

		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [lat,lon]);

	return(
		<section className={`gradient ${tod} ${gradient}`}>
			{/* <Header /> */}
			
			<main className='container'>
				<Weather />
			</main>

			<Footer />
		</section>
	);
}