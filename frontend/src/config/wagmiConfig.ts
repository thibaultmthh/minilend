import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { celo, celoAlfajores, flowMainnet, flowTestnet } from "viem/chains";
import { createConfig } from "wagmi";

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

export const wagmiConfig = createConfig({
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
