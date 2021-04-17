import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/main';
import ContextProvider from './provider/ContextProvider';
import './index.scss';

ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<App />
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);