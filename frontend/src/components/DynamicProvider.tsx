"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { Config, createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { celo, flowMainnet, flowTestnet } from "viem/chains";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useEffect } from "react";
import { useState } from "react";

const queryClient = new QueryClient();

export default function DynamicProvider({ children }: { children: React.ReactNode }) {
  // @ts-expect-error -- isMiniPay is not here by default
  const isMiniPay = window.ethereum?.isMiniPay;

  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    setConfig(
      createConfig({
        chains: isMiniPay ? [celo] : [celo, flowTestnet, flowMainnet],
        multiInjectedProviderDiscovery: false,
        transports: {
          [celo.id]: http(),
          [flowMainnet.id]: http(),
          [flowTestnet.id]: http(),
        },
      })
    );
  }, [isMiniPay]);

  if (!config) {
    return false;
  }

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
