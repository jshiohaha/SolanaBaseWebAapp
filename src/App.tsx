import { useEffect, useState } from "react";
import { Connection } from "@solana/web3.js";
import { Provider } from "@project-serum/anchor";
import { NETWORK, OPTS } from "./utils/constants";

import idl from "./data/idl.json";
import "./App.css";

const App = () => {
    // State
    const [walletAddress, setWalletAddress] = useState(null);

    /** [START] USE EFFECT FUNCTIONS ON COMPONENT DID LOAD */
    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected();
        };
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
    }, []);

    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected();
        };
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
    }, []);

    useEffect(() => {
        if (walletAddress) {
            // do something if wallet is connected
        }
    }, [walletAddress]);
    /** [END] USE EFFECT FUNCTIONS */

    // Actions
    const checkIfWalletIsConnected = async () => {
        try {
            const { solana } = window;

            if (solana) {
                if (solana.isPhantom) {
                    console.log("Phantom wallet found!");
                    const response = await solana.connect({
                        onlyIfTrusted: true,
                    });
                    console.log(
                        "Connected with Public Key:",
                        response.publicKey.toString()
                    );

                    /*
                     * Set the user's publicKey in state to be used later!
                     */
                    setWalletAddress(response.publicKey.toString());
                }
            } else {
                alert("Solana object not found! Get a Phantom Wallet 👻");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const connectWallet = async () => {
        const { solana } = window;

        if (solana) {
            const response = await solana.connect();
            console.log(
                "Connected with Public Key:",
                response.publicKey.toString()
            );
            setWalletAddress(response.publicKey.toString());
        }
    };

    const renderNotConnectedContainer = () => (
        return (
            <button
                className="cta-button connect-wallet-button"
                onClick={connectWallet}
            >
                Connect to Wallet
            </button>
        );
    );

    const getProvider = () => {
        const connection = new Connection(NETWORK, OPTS.preflightCommitment);
        const provider = new Provider(
            connection,
            window.solana,
            OPTS.preflightCommitment
        );
        return provider;
    };

    const renderConnectedContainer = () => {
        return (
            <div className="connected-container">
                <p>Connected Container</p>
            </div>
        );
    };

    return (
        <div className="App">
            {/* This was solely added for some styling fanciness */}
            <div className={walletAddress ? "authed-container" : "container"}>
                <div className="header-container">
                    <p className="header">Title</p>
                    <p className="sub-text">Description ✨</p>

                    {/* Add the condition to show this only if we don't have a wallet address */}
                    {!walletAddress && renderNotConnectedContainer()}
                    {/* We just need to add the inverse here! */}
                    {walletAddress && renderConnectedContainer()}
                </div>
            </div>
        </div>
    );
};

export default App;
