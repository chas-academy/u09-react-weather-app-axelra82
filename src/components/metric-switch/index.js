/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import StoreContext from '../../context/StoreContext';

import './style.scss';

export default () => {

    const {
		store: {
            unit,
		    setUnit,
		}
	} = useContext(StoreContext);

    return(
        <>
        </>
    );
}