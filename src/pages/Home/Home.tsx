import React, { useState, useEffect, FormEvent } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import Color from '../../abis/Color.json';
import Header from '../../layouts/Header';
import MintForm from '../../components/MintForm';
import ColorList from '../../components/ColorList';

const Home = () => {
	const [contract, setContract] = useState<any>(null);
	const [totalSupply, setTotalSupply] = useState<any>(null);
	const [colors, setColors] = useState<Array<string>>([]);
	const [inputColor, setInputColor] = useState<string>('');

	const { active, account, library, chainId } = useWeb3React<Web3Provider>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = event.currentTarget.value;
		setInputColor(newValue);
	};

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const inputColorArr: Array<string> = inputColor ? inputColor.split('#') : [];

		if (!inputColor) {
			alert('색상을 입력해주세요.');
			return;
		}
		if (inputColor.length !== 7) {
			alert('색상은 #을 포함하여 총 7자리여야 합니다.');
			return;
		}
		if (inputColorArr.length === 1) {
			alert('색상에는 반드시 #이 포함되어야 합니다.');
			return;
		}
		if (inputColorArr.length > 2) {
			alert('#은 한 개만 포함 될 수 있습니다.');
			return;
		}
		if (inputColorArr[0] !== '') {
			alert('색상은 반드시 #으로 시작해야 합니다.');
		}

		const colorCheck = colors.find((color) => color === inputColor);
		if (colorCheck) {
			alert('이미 등록되어 있는 색상을 Mint 할 순 없습니다.');
			return;
		}

		mint(inputColor);
	}

	function mint(color: string): void {
		contract.methods
			.mint(color)
			.send({ from: account })
			.on('transactionHash', (hash: string) => {
				console.log('hash >', hash);
				setColors([...colors, color]);
			})
			.on('error', function (error: Error) {
				console.log('error >', error);
				// if (error && error.code !== 4001) {
				alert('예기치 못한 에러가 발생하여 Mint가 종료되었습니다.');
				// }
			})
			.on('receipt', (receipt: any) => {
				console.log('receipt >', receipt);
			});
	}

	async function loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			window.alert('이더리움이 없습니다. 메타마스크를 이용해보세요!');
		}
	}

	async function loadBlockchainData(): Promise<void> {
		const web3 = window.web3;
		try {
			// const accounts = await web3.eth.getAccounts();
			// setAccount(accounts[0]);

			const networkId = await web3.eth.net.getId(); // 가나슈의 network id

			//@ts-ignore
			const networkData = Color.networks[networkId]; // abis/Color.json에 보면 networks 안에 address 값이 있음.

			if (networkData) {
				const { address } = networkData; // 네트워크 주소값
				const abi = Color.abi; // abi는 계약내용? 같음

				// contract를 가져오기 위해선 abi, 주소가 필요함
				const newContract = new web3.eth.Contract(abi, address);
				setContract(newContract);

				const newTotalSupply = await newContract.methods.totalSupply().call();
				setTotalSupply(newTotalSupply);

				let newColors: Array<string> = [];
				for (let i = 1; i <= newTotalSupply; i++) {
					const color = await newContract.methods.colors(i - 1).call();
					newColors = newColors.concat(color);
				}
				setColors(newColors);
			} else {
				window.alert('스마트 컨트랙트가 네트워크에 배포되어 있지 않으므로 사용 할 수 없습니다.');
			}
		} catch (e) {
			console.log(e);
			window.alert('예기치 못한 에러 발생');
		}
	}

	useEffect(() => {
		loadWeb3();
		loadBlockchainData();
	}, []);

	return (
		<>
			<Header />
			<hr style={{ margin: '2rem' }} />
			{active && (
				<>
					<MintForm inputColor={inputColor} handleSubmit={handleSubmit} handleChange={handleChange} />
					<hr style={{ margin: '2rem' }} />
					<ColorList colors={colors} />
				</>
			)}
		</>
	);
};

export default Home;
