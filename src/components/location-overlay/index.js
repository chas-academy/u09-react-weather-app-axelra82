/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from 'react';
import StoreContext from '../../context/StoreContext';

import Search from '../search';

import './style.scss';

export default () => {
    
    const {
		store: {
            menuOpen: isOpen,
		}
	} = useContext(StoreContext);

    return(
        <section id='location-overlay' className={isOpen ? 'open' : ''}>
            <div className='container'>
            <Search />
            </div>
        </section>
    );
}