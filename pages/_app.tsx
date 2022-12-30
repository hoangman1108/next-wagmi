import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { avalanche, bsc, mainnet, bscTestnet } from "wagmi/chains";

import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { Suspense } from "react";
const { chains, provider, webSocketProvider } = configureChains(
  [avalanche, bsc, mainnet, bscTestnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Suspense fallback={<>Loading...</>}>
        <Component {...pageProps} />
      </Suspense>
    </WagmiConfig>
  );
}
