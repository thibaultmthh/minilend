"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { celo, celoAlfajores, flowMainnet, flowTestnet } from "viem/chains";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { apolloClientClient } from "../config/apolloClients";
import { ApolloProvider } from "@apollo/client";

const queryClient = new QueryClient();

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "Celo Composer",
    projectId: process.env.WC_PROJECT_ID ?? "044601f65212332475a09bc14ceb3c34",
  }
);

const config = createConfig({
  chains: [celo, celoAlfajores, flowTestnet, flowMainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [celo.id]: http(),
    [flowMainnet.id]: http(),
    [flowTestnet.id]: http(),
    [celoAlfajores.id]: http(),
  },
  connectors,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID as string,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <ApolloProvider client={apolloClientClient}>{children}</ApolloProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
