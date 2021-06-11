import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEagerConnect, useInactiveListener } from '../hooks/useInjected';
import { injected } from '../helpers/connectors';
import Spinner from './Spinner';

const InjectedButton = () => {
	const context = useWeb3React<Web3Provider>();
	const { connector, library, chainId, account, activate, deactivate, active, error } = context;

	// 현재 활성화되고있는 커넥터를 인식하는 로직 처리
	const [activatingConnector, setActivatingConnector] = React.useState<any>();
	React.useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	// 삽입 된 이더 리움 공급자가 존재하고 이미 액세스 권한을 부여한 경우이를 간절히 연결하는 논리를 처리합니다.
	const triedEager = useEagerConnect();

	// 삽입 된 이더 리움 공급자 (존재하는 경우)의 특정 이벤트에 대한 반응으로 연결하는 로직 처리
	useInactiveListener(!triedEager || !!activatingConnector);

	const currentConnector = injected;
	const activating = currentConnector === activatingConnector;
	const connected = currentConnector === connector;
	const disabled = !triedEager || !!activatingConnector || connected || !!error;
	return (
		<button
			style={{
				height: '3rem',
				borderRadius: '1rem',
				borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
				cursor: disabled ? 'unset' : 'pointer',
				position: 'relative',
			}}
			type="button"
			disabled={disabled}
			key="injected"
			onClick={() => {
				setActivatingConnector(currentConnector);
				activate(injected);
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: '0',
					left: '0',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					color: 'black',
					margin: '0 0 0 1rem',
				}}
			>
				{activating && <Spinner />}
				{connected && (
					<span role="img" aria-label="check">
						✅
					</span>
				)}
			</div>
			injected
		</button>
	);
};

export default InjectedButton;
