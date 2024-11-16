"use client";

import { useEffect } from "react";

import { useState } from "react";
import { useConnect } from "wagmi";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

import { injected } from "@wagmi/connectors";
export default function ConnectButton() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      // User is using MiniPay so hide connect wallet button.
      setHideConnectBtn(true);
      function connectWallet() {
        connect({ connector: injected({ target: "metaMask" }) });
      }
      setTimeout(connectWallet, 1000);
    }
  }, [connect]);

  // const client = createWalletClient();

  return <div>{!hideConnectBtn && <DynamicWidget />}</div>;
}
