import Web3 from 'web3';
import React, { useState } from 'react';

import './app.css';

const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.sepolia.org")); //"http://localhost:8545"));

const dest = '0xB25934228972Fe7a16B2Be33731fC16216a2fff7'; //'0xC1a9D28A1b5D7Ea73b79268b0ee5355B208698A3';

function App() {
	const [address, setAddress] = useState("");
	const [balance, setBalance] = useState("0");

	async function connectHandler() {
		const { ethereum } = window;

		if (!ethereum) {
			window.open("https://metamask.app.link/dapp/sukharev-andrey.github.io/");
		}
	
		const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		const addr = accounts[0];
		setAddress(addr);

		const walletBalance = await web3.eth.getBalance(addr);
		await setBalance(web3.utils.fromWei(walletBalance, "ether"));
	}

	async function refreshBalance() {
		const walletBalance = await web3.eth.getBalance(address);
		await setBalance(web3.utils.fromWei(walletBalance, "ether"));
	}

	async function makeTransaction() {
		const { ethereum } = window;
		const value = 1000000000000000; // web3.utils.toWei(0.01, "ether");
		console.log("transaction", 'from', address, 'to', dest, 'value', value); 

		try {
		await ethereum
			.request(
				{
					method: 'eth_sendTransaction',
					params: [
						{
							from: address,
							to: dest,
							value: "0x" + value.toString(16),
						},
					],
				}
			);
		}
		catch (err) {}
	}
	
	return (
		<div className="App">
			{address !== "" ? 
				<h1>Connected wallet: {address}</h1> :
				<h1>Wallet is not connected</h1>
			}
			<h1>Balance: {balance} ETH</h1>
		
			<button onClick={connectHandler}>Connect</button>
			<br/>
			<br/>
			<button onClick={refreshBalance}>Refresh</button>
			<br/>
			<br/>
			<button onClick={makeTransaction}>Send</button>
		</div>
	);
}

export default App;
