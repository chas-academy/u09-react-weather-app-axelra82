import React from 'react';
import ReactDOM from 'react-dom';
import { Main, Header, Footer } from './layout';
import ContextProvider from './provider/ContextProvider';
import './index.scss';

ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<Header />
			<Main />
			<Footer />
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);