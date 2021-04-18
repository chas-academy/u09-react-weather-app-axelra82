/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import env from 'react-dotenv';

export default async (query) => {
    // Make sure to NOT USE default react-scripts for environment
	// handling on secret variables (e.g. API keys etc) as they will
	// be visible in frontend after build:
    // https://create-react-app.dev/docs/adding-custom-environment-variables/
	const apiUrl = env.REACT_APP_OWM_API_URL;
	const apiKey = env.REACT_APP_OWM_API_KEY;
	let response;
	
	try {
		
		// Set up API request
		const endpointUrl = `${apiUrl}/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
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
			message: `in call: ${error}`
		}
	}

	// Return response object
	return response;
}