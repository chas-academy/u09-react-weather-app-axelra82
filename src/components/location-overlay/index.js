/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../../context/StoreContext';

import { getLocal } from '../../helpers';

import SavedList from './saved-locations';
import Search from './search';

import './style.scss';

export default () => {
    
    const {
        store: {
            menuOpen: isOpen,
		}
	} = useContext(StoreContext);
    
    const [saved] = useState(getLocal());

    const [active, setActive] = useState('');
    const [haveSaved, setHaveSaved] = useState(typeof saved === 'object' && saved.locations.length > 0);


    useEffect(() => {
        setHaveSaved(haveSaved);
        haveSaved ? setActive('list') : setActive('search');
    },[haveSaved])

    const showSaved = () => {
        active !== 'list' && haveSaved && setActive('list');
    }
    
    const showSearch = () => {
        active !== 'search' && setActive('search');
    }

    return(
        <section id='location-overlay' className={isOpen ? 'open' : ''}>
            <div id='overlay-options'>
                <span
                    onClick={showSaved}
                    className={`material-icons ${active === 'list' ? 'active' : ''}`}
                >star</span>
                <span
                    onClick={showSearch}
                    className={`material-icons ${active === 'search' ? 'active' : ''}`}
                >search</span>
            </div>

            <div className='container'>
                {active === 'list' && haveSaved &&
                    <SavedList locations={saved.locations} />
                }
                {active === 'search' &&
                    <Search />
                }
            </div>
        </section>
    );
}