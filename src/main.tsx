import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { bsc, mainnet, arbitrum, sepolia } from "wagmi/chains";

import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, bsc, arbitrum, sepolia],
  [
    infuraProvider({ apiKey: "063a60c10ac741779bd263e121f5148f" }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "64394d0ec6a9120f8afe242cc7e45f04",
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
