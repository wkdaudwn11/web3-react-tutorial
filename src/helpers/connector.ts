import { InjectedConnector } from '@web3-react/injected-connector';

const CHAIN_IDS = [
	1, // ether mainnet
	3,
	4,
	5,
	42, // ether testnet
	1337, // local
	80001, // matic testnet mumbai
	137, // matic mainnet
];

export const injected = new InjectedConnector({ supportedChainIds: CHAIN_IDS });
