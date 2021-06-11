import React from 'react';
import { useWeb3React } from '@web3-react/core';
import Header from '../../layouts/Header';
import MintForm from '../../components/MintForm';

const Home = () => {
	return (
		<>
			<Header />
			<hr style={{ margin: '2rem' }} />
			<MintForm />
		</>
	);
};

export default Home;
