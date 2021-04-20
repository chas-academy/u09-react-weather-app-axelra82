/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import './style.scss';

export default ({data}) => {

    const { time, temp, icon } = data;
    return(
        <div className='hourly-box ts-small'>
            {time}
            <i className={icon}></i>
            {temp}
        </div>
    );
}