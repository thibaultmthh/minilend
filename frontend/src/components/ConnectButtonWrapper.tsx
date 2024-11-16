"use client";

import dynamic from "next/dynamic";

// import ConnectButton from "./ConnectButton"

const ConnectButton = dynamic(() => import("./ConnectButton"), { ssr: false });

export default function ConnectButtonWrapper() {
  return <ConnectButton />;
}
