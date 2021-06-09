import { InjectedConnector } from '@web3-react/injected-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
	1: process.env.RPC_URL_1 as string,
	4: process.env.RPC_URL_4 as string,
};
const SUPPORTED_CHAIN_IDS = [
	1, // ether mainnet
	3,
	4,
	5,
	42, // ether testnet
	1337, // local
	80001, // matic testnet mumbai
	137, // matic mainnet
];

export const injected = new InjectedConnector({
	supportedChainIds: SUPPORTED_CHAIN_IDS,
});
