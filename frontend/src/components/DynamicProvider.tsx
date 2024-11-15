"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { celo } from "viem/chains";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const config = createConfig({
  chains: [celo],
  multiInjectedProviderDiscovery: false,
  transports: {
    [celo.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function DynamicProvider({ children }: { children: React.ReactNode }) {
  console.log("ID ", process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID);

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
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
