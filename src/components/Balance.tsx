import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';

const Balance = () => {
	const { account, library, chainId } = useWeb3React();

	const [balance, setBalance] = React.useState<number | null>();
	React.useEffect((): any => {
		if (!!account && !!library) {
			let stale = false;

			library
				.getBalance(account)
				.then((balance: any) => {
					if (!stale) {
						setBalance(balance);
					}
				})
				.catch(() => {
					if (!stale) {
						setBalance(null);
					}
				});

			return () => {
				stale = true;
				setBalance(undefined);
			};
		}
	}, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

	return (
		<>
			<span>Balance</span>
			<span role="img" aria-label="gold">
				💰
			</span>
			<span>{balance === null ? 'Error' : balance ? `${formatEther(balance)}` : ''}</span>
		</>
	);
};

export default Balance;
