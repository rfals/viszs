import "./App.css";
import PlazaLogo from "./assets/images/image-removebg-preview2.png";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";

function App() {
	const [usdc, setUsdc] = useState("50");
	const [rplz, setRplz] = useState("1");

	const Injected = new InjectedConnector({
		supportedChainIds: [137, 80001],
	});

	const { active, activate, deactivate, library, chainId, account } =
		useWeb3React();

	async function connect() {
		try {
			await activate(Injected);
			localStorage.setItem("isWalletConnected", true);
		} catch (ex) {
			console.log(ex);
		}
	}

	async function disconnect() {
		try {
			deactivate();
			localStorage.setItem("isWalletConnected", false);
		} catch (ex) {
			console.log(ex);
		}
	}

	useEffect(() => {
		const connectWalletOnPageLoad = async () => {
			if (localStorage?.getItem("isWalletConnected") === "true") {
				try {
					await activate(Injected);
					localStorage.setItem("isWalletConnected", true);
				} catch (ex) {
					console.log(ex);
				}
			}
		};
		connectWalletOnPageLoad();
	}, []);

	return (
		<div className="App">
			<nav className="header">
				<a href="/">
					<img
						src={PlazaLogo}
						alt="Plaza Logo"
						className="nav-brand"
					/>
				</a>
			</nav>
			<main className="content">
				<div className="card">
					<h3 className="card-title">RigaPlaza Token $RPLZ</h3>
					<p className="card-description">
						Make sure you have enough USDC and then choose the
						amount of $RPLZ.
					</p>
					<form className="form">
						<p className="form-helper">You Pay</p>
						<div className="form-group">
							<label className="form-label">USDC</label>
							<input
								className="form-input"
								name="from"
								type="number"
								value={usdc}
								onChange={(e) =>
									setUsdc(e.target.value) &&
									setRplz(usdc * 50)
								}
							/>
						</div>
						<p className="form-helper">You Receive</p>
						<div className="form-group">
							<label className="form-label">RPLZ</label>
							<input
								className="form-input"
								name="to"
								type="number"
								value={usdc / 50}
								onChange={(e) => setRplz(e.target.value)}
							/>
						</div>
						<div className="form-footer">
							{active ? (
								<>
									<button className="form-btn">Buy</button>
									<button
										className="form-btn form-btn--secondary"
										onClick={disconnect}
									>
										Disconnect Wallet
									</button>
								</>
							) : (
								<button
									onClick={connect}
									className="form-btn"
									tabIndex="0"
									type="button"
									style={{ justifyContent: "center" }}
								>
									Connect Wallet
								</button>
							)}
						</div>
					</form>
				</div>
			</main>
			<footer className="footer-wrapper">
				<div className="footer">
					<div className="footer-left">
						Copyright © 2022 RigaPlaza. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
