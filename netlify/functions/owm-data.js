'use strict';
const axios = require('axios');

exports.handler = async data => {

    // Initial empty return variables
    let statusCode;
    let responseBody;

    // Body data in the post request
    // We need these values to make the request
    const { lat, lon, unit } = JSON.parse(data.body);

    const apiUrl = `${process.env.REACT_APP_OWM_API_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_OWM_API_KEY}`;

    try {
        // Responses
        const request = await axios(apiUrl);
        
        // Success object
        statusCode = 200;
        responseBody = request.data;

    } catch (err) {
        // Error response
        statusCode = 403;
        responseBody = err;
    }

    // Return response
    return {
        statusCode: statusCode,
        body: JSON.stringify(responseBody),
    }
}