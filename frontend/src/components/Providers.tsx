"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import { apolloClientClient } from "../config/apolloClients";
import { ApolloProvider } from "@apollo/client";
import { wagmiConfig } from "../config/wagmiConfig";
import { Toaster } from "./ui/sonner";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { IS_MINI_PAY } from "../utils/constantes";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  // If MiniPay is detected, render without Dynamic
  if (IS_MINI_PAY) {
    return (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClientClient}>
            <RainbowKitProvider>
              <Toaster />
              {children}
            </RainbowKitProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  // Regular flow with Dynamic for non-MiniPay users
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID as string,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <ApolloProvider client={apolloClientClient}>
              <RainbowKitProvider>
                <Toaster />
                {children}
              </RainbowKitProvider>
            </ApolloProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
