/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Burger from '../../components/burger';
import UnitSwitch from '../../components/unit-switch';
import LocationOverlay from '../../components/location-overlay';

import './style.scss';

export default () => {


    return(
        <header>
            <Burger />
            <UnitSwitch />
            <LocationOverlay />
        </header>
    );
}