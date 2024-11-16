"use client";

import { useEffect } from "react";

import { useConnect } from "wagmi";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

import { injected } from "@wagmi/connectors";
import { IS_MINI_PAY } from "../utils/constantes";
export default function ConnectButton() {
  const { connect } = useConnect();

  useEffect(() => {
    if (IS_MINI_PAY) {
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

  return <div>{!IS_MINI_PAY && <DynamicWidget />}</div>;
}
