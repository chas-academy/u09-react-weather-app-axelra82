/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import './style.scss';

export default ({data}) => {

	const {
		day,
		temp: {
			min,
			max,
		},
		icon,
		pop,
	} = data;

	return(
		<section className='daily-row'>
			<div className='daily-day'>
				{day}
			</div>
			<div className='daily-icon'>
				<i className={icon}></i>
				{pop >= 1 && ` ${Math.floor(pop*100)}%`}
			</div>
			<div className='daily-temp'>
				<span className='max-temp text-right'>{max}</span>
				<span className='min-temp text-right'>{min}</span>
			</div> 
		</section>
	);
}