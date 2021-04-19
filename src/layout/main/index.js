/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from 'react';
import StoreContext from '../../context/StoreContext';
import { Header, Footer } from '../';
import Weather from '../../components/weather';

import './style.scss';

export default () => {
	
	const {
		store:{
	        classes: {
                tod,
                gradient
            },
		}
	} = useContext(StoreContext);

	return(
		<section className={`gradient ${tod} ${gradient}`}>
			<Header />
			
			<main className='container'>
				<Weather />
			</main>

			<Footer />
		</section>
	);
}