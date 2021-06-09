import React from 'react';
import Web3Provider from './components/web3/Web3Provider';
import Connect from './components/web3/Connect';
import Main from './components/main';

const App = () => {
	return (
		<Web3Provider>
			<Connect>
				<Main />
			</Connect>
		</Web3Provider>
	);
};

export default App;
