/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from 'react';
import StoreContext from '../../context/StoreContext';

import { getLocal, setLocal } from '../../helpers';

import './style.scss';

export default () => {
    const {
		store: {
            menuOpen: isOpen,
            setMenuOpen: setIsOpen,
            location,
		}
	} = useContext(StoreContext);

    const toggleMenu = () => {
        setIsOpen(state => !state);
        document.body.classList.toggle('scroll-lock');
    }

    const saveLocation = () => {
        const localState = getLocal();
        // Test for existing entries before adding to list
        const locationExists = localState.locations.some(li => li.lat === location.lat && li.lon === location.lon);
       
        if(!locationExists){
            setLocal({
                ...localState,
                locations: [
                    ...localState.locations,
                    location,
                ]
            });
        }else{
            alert(`${location.name} with lat: ${location.lat} and lon: ${location.lon} is already in your saved locations.`)   
        }
    }

    return(
        <>
            <div
                id='burger-menu'
                className={isOpen ? 'open' : ''}
                onClick={toggleMenu}
            >
                <div />
                <div />
                <div />  
            </div>
            
            <span
                id='layout-save-icon'
                className='material-icons'
                onClick={saveLocation}
            >star</span>
        </>
    );
}