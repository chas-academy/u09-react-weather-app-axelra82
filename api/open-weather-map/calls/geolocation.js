/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
// import env from 'react-dotenv';

export default async (direction, data) => {
    // Make sure to NOT USE default react-scripts for environment
	// handling on secret variables (e.g. API keys etc) as they will
	// be visible in frontend after build:
    // https://create-react-app.dev/docs/adding-custom-environment-variables/
	const apiUrl = process.env.REACT_APP_OWM_API_URL;
	const apiKey = process.env.REACT_APP_OWM_API_KEY;
	const endpointSettings = `&limit=5&appid=${apiKey}`;
	let endpointUrl;
	let response;

	console.log(data);
	
	switch (direction) {
		case 'direct':
			endpointUrl = `${apiUrl}/geo/1.0/direct?q=${data}${endpointSettings}`;
			break;
	
		case 'reverse':
			endpointUrl = `${apiUrl}/geo/1.0/reverse?lat=${data.lat}&lon=${data.lon}${endpointSettings}`;
			break;
	}
	try {
		
		// Set up API request
		
		const options = {
			url: endpointUrl,
			method: 'get',
		}
		
		// Response from request
		const request = await axios(options);
		
		// Success object
		response = request.data

	} catch (error) {

		// Error object
		response = {
			success: false,
			message: error,
		}
	}

	// Return response object
	return response;
}