/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from 'react';
import StoreContext from '../../context/StoreContext';
import { getLocal, setLocal } from '../../helpers';

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

	const buttonClick = (newUnit) => {
		setUnit({
			...unit,
			current: newUnit,
		});

		setLocal({
			...getLocal(),
			unit: newUnit
		});
	};
	
	const active = (value) => {
		return current === value ? 'active' : ''
	}

	return(
		<div id="unit-switch-buttons">
			<button
				className={`info outline text-tiny ${active(metric.value)}`}
				onClick={() => buttonClick(metric.value)}
			>
				&deg;C
			</button>
			<span className='unit-separator'>/</span>
			<button
				className={`info outline text-tiny ${active(farenheit.value)}`}
				onClick={() => buttonClick(farenheit.value)}
			>
				&deg;F
			</button>
		</div>
	);
}