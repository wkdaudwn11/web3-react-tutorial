import { InjectedConnector } from '@web3-react/injected-connector';

export const CHAIN_IDS = [
	1337, // 가나슈 기본 Chain id값
];

export const injected = new InjectedConnector({ supportedChainIds: CHAIN_IDS });
