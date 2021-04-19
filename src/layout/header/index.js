/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Search from '../../components/search';
import UnitSwitch from '../../components/unit-switch';

import './style.scss';

export default () => {

    return(
        <header>
            <section className='container'>
                <Search />
                <UnitSwitch />
		    </section>
        </header>
    );
}