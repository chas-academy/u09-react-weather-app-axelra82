/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useState } from 'react';
import StoreContext from '../../context/StoreContext';

import './style.scss';

export default () => {

	const {
		store: {
			unit,
			setUnit,
		}
	} = useContext(StoreContext);

	const {
		current,
		options
	} = unit;

	const metric = options[0];
	const farenheit = options[1];

	const buttonClick = (metric) => {
		setUnit({
			...unit,
			current: metric,
		});
	};
	
	return(
		<>
			<button
				className={`info outline text-tiny ${current === 'metric' ? 'active' : ''}`}
				onClick={() => buttonClick(metric.value)}
			>
				{metric.value}: &deg;{metric.symbol}, {metric.speed}
			</button>
			<button
				className={`info outline text-tiny ${current !== 'metric' ? 'active' : ''}`}
				onClick={() => buttonClick(farenheit.value)}
			>
				{farenheit.value}: &deg;{farenheit.symbol}, {farenheit.speed}
			</button>
		</>
	);
}