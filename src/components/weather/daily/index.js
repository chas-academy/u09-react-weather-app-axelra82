/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import './style.scss';

export default ({data}) => {

	console.log(data);

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
				{pop >= 1 && ` ${pop}%`}
			</div>
			<div className='daily-temp'>
				<span className='max-temp'>{max}</span>
				<span className='min-temp'>{min}</span>
			</div> 
		</section>
	);
}