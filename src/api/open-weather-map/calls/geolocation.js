/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
import axios from 'axios';

export default async (query) => {
	const apiUrl = process.env.REACT_APP_OWM_API_URL;
	const apiKey = process.env.REACT_APP_OWM_API_KEY;
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
		// request.data = JSON.parse(request.data);
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