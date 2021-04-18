/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../../context/StoreContext';

import './style.scss';

export default () => {
    
    const {store} = useContext(StoreContext);
    
    const time = typeof store.data.current.dt !== 'undefined' ?
    new Date(store.data.current.dt * 1000).toTimeString()
    // new Date(store.data.current.dt * 1000).toLocaleTimeString()
    :
    null;

    const temp = store.data.current.temp;

    // useEffect(() => {
    //     console.log(store);
    // }, [store]);

    return(
        <article>
            <p>
                <strong>{store.location.name}, {store.location.country}</strong>
            </p>
            <p>
                {time}
            </p>
            <div>
                Temp {temp}
            </div>

            <br />
            Lat: {store.location.lat}
            <br />
            Long: {store.location.lon}
        </article>
    )
}