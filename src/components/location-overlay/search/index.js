/* eslint-disable import/no-anonymous-default-export */
import { useContext, useState } from 'react';
import StoreContext from '../../../context/StoreContext';
import axios from 'axios';

import { twoDecimal, countrCodeName } from '../../../helpers';

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

	const defaultStates = {
		resultCount: 0,
		results: [],
		noString: false,
		noResults: false,
		multipleResults: false,
	}

	const [states, setStates] = useState(defaultStates);

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

	const doSearch = async(e) => {
		// Prevent form from default action
		e.preventDefault();
		
		// Reset on each search
		setStates(defaultStates);

		const searchField = e.target.childNodes[0];
		const str = searchField.value;

		if(str) {
			setSearchLocation(true);
			const location = await getGeoLocation(str);

			if(location.length > 0){

				if(location.length > 1){
					// Found more
					setStates({
						...states,
						results: location,
						resultCount: location.length,
						multipleResults: true,
					});
				}else{
					// We got exactly one hit
					const {lat, lon, name, country } = location[0];
					setLat(lat);
					setLon(lon);
					setCountry(country);
					setName(name);
					setMenuOpen(false);
				}

				searchField.value = '';
			}else{
				setStates({
					...states,
					noResults: true,
				});
			}	
		}else{
			// Notify about no string
			setStates({
				...states,
				noString: true,
			});
		}
	}

	// On click handler for multiple results
	const getSelectedResult = (result) => {
		const {lat, lon, name, country } = result;
		setLat(lat);
		setLon(lon);
		setCountry(country);
		setName(name);
		setMenuOpen(false);
		resetStates();
	}

	const resetStates = () => {
		// Reset all states
		setStates(defaultStates);
	}

	return(
		<>
			<form onFocus={resetStates} onSubmit={doSearch} id='location-search'>
				<input name='searchString' type='text' placeholder='Location' />
				<button type='submit'>Search</button>
			</form>
			{/* Inform user */}
			{(states.noResults || states.multipleResults || states.noString) &&
				<article className='text-center mt-1'>
					<h1 className='h5'>
						{states.noString &&
							<>Please enter a city name to search for</>
						}
						{states.noResults &&
							<>Sorry, we couldn't find any location matcing that name</>
						}
						{states.multipleResults &&
							<>
								<p>We found {states.resultCount} locations matching your search</p>
								<span className='ts-small'>Click on the location to get weather</span>
								<ul className='overlay-list mt-1'>
								{states.results.map((item, idx) => {
									const {lat, lon, name, country} = item;
									return(
										<li
											key={`multiple-results-list-item-${idx}`}
											onClick={() => getSelectedResult(item)}
										>
											{name} <span className='ts-small'>({countrCodeName(country).name})</span>
											<div className='ts-small'>
												lat: {twoDecimal(lat)}, lon: {twoDecimal(lon)}
											</div>
										</li>
									);
								})}
								</ul>
							</>
						}
					</h1>
				</article>
			}
		</>
	);
}