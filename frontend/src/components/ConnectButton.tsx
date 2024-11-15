"use client";

import { useEffect } from "react";

import { useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
// import { InjectedConnector } from "wagmi/connectors/injected";

export default function ConnectButton() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect({
    // connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (
      window.ethereum &&
      // @ts-expect-error -- isMiniPay is not a standard property of window.ethereum
      window.ethereum.isMiniPay
    ) {
      // User is using MiniPay so hide connect wallet button.
      setHideConnectBtn(true);

      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, [connect, window.ethereum]);

  // const client = createWalletClient();

  return <div>{!hideConnectBtn && <DynamicWidget />}</div>;
}
