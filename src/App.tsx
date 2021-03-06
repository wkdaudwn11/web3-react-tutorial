import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';

declare global {
	interface Window {
		ethereum: any;
		web3: any;
	}
}

function getLibrary(provider: any): Web3Provider {
	const library = new Web3Provider(provider);
	library.pollingInterval = 12000;
	return library;
}

function App() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Container fluid>
				<Home />
			</Container>
		</Web3ReactProvider>
	);
}

export default App;
