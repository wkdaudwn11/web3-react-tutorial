import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../helpers/connector';
import { useEagerConnect, useInactiveListener } from '../../hooks/useInjected';

interface ConnectProps {
	children: React.ReactNode;
}

const Connect: React.FC<ConnectProps> = ({ children }) => {
	const tried = useEagerConnect();
	useInactiveListener(!tried);

	const { active, activate } = useWeb3React();
	const onError = (err: any) => {
		console.error(err);
	};

	const activateWeb3 = () => {
		activate(injected, onError, true).catch((err) => {
			console.error(err);
		});
	};

	return active ? (
		<>{children}</>
	) : (
		<button type="button" onClick={() => activateWeb3()}>
			지갑 연동
		</button>
	);
};

export default Connect;
