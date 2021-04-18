import { useContext, useEffect } from 'react';
import StoreContext from '../../context/StoreContext';
import { getGeoLocation } from '../../api/open-weather-map'
import './style.scss';

export default () => {
	
	const {
		store: {
			location: {
				lat,
				lon,
				setLat,
				setLon,
			}
		}
	} = useContext(StoreContext);

	useEffect(() => {
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
		}else{
			alert('Geolocation does not appear to be supported in this browser.');
		}

		// Default values, i.e. no input
		if(lat === 0 && lon === 0){

		}
	}, []);

	const doSearch = async (e) => {
		e.preventDefault();
		const str = e.target.childNodes[0].value;
		// console.log(str);

		if(str) {
			const location = await getGeoLocation(str);
			console.log(location);

			if(typeof location !== 'undefined'){
				if(location.length > 1){
					// Found more
				}
			}
		}
	}

	return(
		<>
			<form onSubmit={doSearch}>
				<input name="searchString" type="text" placeholder="Search location" />
				<button type="submit">Show</button>
			</form>
		</>
	);
}