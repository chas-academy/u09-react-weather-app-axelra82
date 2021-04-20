import React from 'react';

import './style.scss';

export default ({data}) => {

    console.log(data);
    const { time, temp, icon, description } = data;
    return(
        <div className='hourly-box ts-small'>
            {time}
            <i className={icon}></i>
            {temp}
        </div>
    );
}