/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from 'react';
import StoreContext from '../../context/StoreContext';

import './style.scss';

export default () => {
    const {
		store: {
            menuOpen: isOpen,
            setMenuOpen: setIsOpen,
		}
	} = useContext(StoreContext);

    const toggleMenu = () => {
        setIsOpen(state => !state);
        document.body.classList.toggle('scroll-lock');
    }

    return(
        <div
            id='burger-menu'
            className={isOpen ? 'open' : ''}
            onClick={toggleMenu}
        >
            <div />
            <div />
            <div />  
        </div>
    );
}