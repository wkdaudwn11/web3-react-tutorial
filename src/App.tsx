import React from 'react';
import Web3Provider from './components/web3/Web3Provider';
import Connect from './components/web3/Connect';

const App = () => {
	return (
		<Web3Provider>
			<Connect>ok</Connect>
		</Web3Provider>
	);
};

export default App;
