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
        console.log('save location function');
        const localState = getLocal();

        setLocal({
            ...localState,
            locations: [
                ...localState.locations,
                location,
            ]
        });
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