/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useState } from 'react';
import StoreContext from '../../../context/StoreContext';

import { getLocal, setLocal, twoDecimal } from '../../../helpers';

export default ({locations}) => {

    const {
		store: {
			setMenuOpen,
            setSearchLocation,
			location: {
				setLat,
				setLon,
				setCountry,
				setName,
			}
		}
	} = useContext(StoreContext);

    const selectLocation = location => {
        const { lat, lon, name, country } = location;
        setSearchLocation(true);
        setLat(lat);
        setLon(lon);
        setCountry(country);
        setName(name);
        setMenuOpen(false);
    }

    const [locationsState, setLocationsState] = useState(locations);
    
    const removeLocation = index => {
        const updatedLocations = locationsState.filter((item, idx) => idx !== index);
        
        // State handling
        setLocationsState(updatedLocations);
        
        // Data handling
        setLocal({
            ...getLocal(),
            locations: updatedLocations
        });
    }

    return(
        <article>
            <h1 className='h5 text-center'>Saved locations</h1>
            <ul className='overlay-list'>
                {locationsState.map((item, idx) => {
                    const { lat, lon, name, country } = item;
                    return(
                        <li
                            key={`saved-locations-item-${idx}`}
                        >
                            <span
                                onClick={() => removeLocation(idx)}
                                className='material-icons fs-small'
                            >delete</span>
                            <div onClick={() => selectLocation(item)}>
                                {name} <span className='ts-small'>({country})</span>
                                <div className='ts-small fw-thin'>lat: {twoDecimal(lat)}, lon: {twoDecimal(lon)}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}