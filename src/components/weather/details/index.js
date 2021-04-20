/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import './style.scss';

export default ({
	content:{
		icon,
		title,
		value,
		unit = null
	}
}) => {
	
	return(
		<article className='weather-detail-box'>
			<i className={`wi wi-${icon}`}></i>
			<div className='ts-small fw-thin'>
				{title}
			</div>
			<div className='ts-medium'>
				{value} {unit && unit}
			</div>
		</article>
	);
}