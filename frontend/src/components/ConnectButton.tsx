"use client";

import { useEffect } from "react";

import { useConnect } from "wagmi";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

import { injected } from "@wagmi/connectors";
import { isMiniPay } from "../utils/isMiniPay";
export default function ConnectButton() {
  const { connect } = useConnect();

  useEffect(() => {
    if (isMiniPay()) {
      // User is using MiniPay so hide connect wallet button.

      function connectWallet() {
        connect(
          { connector: injected({ target: "metaMask" }) },
          {
            onError(error) {
              alert(error.message);
            },
          }
        );
      }
      setTimeout(connectWallet, 1000);
    }
  }, [connect]);

  // const client = createWalletClient();

  return <div>{!isMiniPay() && <DynamicWidget />}</div>;
}
