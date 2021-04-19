/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect } from 'react';
import StoreContext from '../../context/StoreContext';

export default () => {
	
	const {
		store:{
			unit: {
				current: currentUnit,
				options: unitOptions,
			},
			location: {
				name: locationName,
				country: locationCountry,
				lat,
				lon,
			},
            classes: {
                tod,
                setTod,
                setGradient
            },
			data: {
				current: {
					dt: currentTime,
					temp: currentTemp,
					feels_like: currentFeelLike,
					wind_speed: currentWindSpeed,
					pressure: currentPressure,
					humidity: currentHumidity,
					dew_point: currentDewPoint,
					uvi: currentUvIndex,
					weather: currentWeatherDetails
				},
				daily
			}
		}
	} = useContext(StoreContext);
	
	const unit = unitOptions.find(unit => unit.value === currentUnit);

	const getTime = (timestamp = null, getDate = false) => {
		
		if(typeof timestamp !== 'undefined'){
			const date = new Date(timestamp * 1000);
			const locale = 'en-US';

			const time = date
			.toLocaleTimeString(
				locale,
				{
					hour: '2-digit',
					minute: '2-digit'
				}
			);

			const day = date
			.toLocaleDateString(
				locale,
				{
					weekday: 'short'
				}

			);

			return getDate ? `${day}, ${time}` : time;
		}

		return null;
	}

	const today = daily[0];

	const {
		sunrise,
		sunset,
		temp: {
			min: todayMinTemp,
			max: todayMaxTemp,
		}
	} = today;

	const {
		id: weatherId,
		main: weatherTitle,
		description: weatherDescription,
		icon: weatherIcon,
	} = currentWeatherDetails[0];
    
    // Use weather icon in response to determine if it's day or night
    // Where d represents 'day' and n represents 'night'    
    const getTod = weatherIcon.includes('d') ? 'day' : 'night';

    useEffect(() => {
        setTod(getTod);
        setGradient(weatherTitle.toLowerCase());
    }, []);

	return(
		<article>
            <h1>{locationName}, {locationCountry}</h1>
            <div className='text-small'>
                <p>
                    Lat: {Math.round(lat * 100)/100}, Lon: {Math.round(lon * 100)/100}
                </p>

                <p>
                    {getTime(currentTime, true)}
                </p>
            </div>

            <h2>
                <i className={`wi wi-owm-${tod}-${weatherId}`}></i>
                {currentTemp}&deg; {unit.symbol}
            </h2>

            <div>
                Feels like {currentFeelLike} &deg;{unit.symbol}. {weatherTitle}. {weatherDescription}
            </div>
            <div>
                <i className='wi wi-direction-up'></i> Hi: {todayMinTemp}&deg; {unit.symbol}, <i className='wi wi-direction-down'></i> Lo: {todayMaxTemp}&deg; {unit.symbol}
            </div>

            <div>
                <div>
                    <i className='wi wi-horizon-alt'></i>
                    Sunrise {getTime(sunrise)}
                </div>
                <div>
                    <i className='wi wi-horizon'></i>
                    Sunset {getTime(sunset)}
                </div>
            </div>

            <div className='main extras'>
                <div>
                    <i className='wi wi-strong-wind'></i>
                    Wind {currentWindSpeed} {unit.speed}
                </div>
                <div>
                    <i className='wi wi-humidity'></i>
                    Humidity {currentHumidity}%
                </div>
                <div>
                    <i className='wi wi-barometer'></i>
                    Pressure {currentPressure}hPa
                </div>
            </div>
        </article>
	);
}