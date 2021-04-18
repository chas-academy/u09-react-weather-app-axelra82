/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect } from 'react';
import StoreContext from '../../context/StoreContext';

import './style.scss';

export default () => {
    
    const {store} = useContext(StoreContext);
    
    useEffect(() => {
        console.log(store);
    }, [store]);

    return(
        <article>
            <strong>Main</strong>
            <br />
            Lat: {store.lat}
            <br />
            Long: {store.lon}
        </article>
    )
}