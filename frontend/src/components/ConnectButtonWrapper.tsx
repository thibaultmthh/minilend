"use client";

import dynamic from "next/dynamic";

const ConnectButton = dynamic(() => import("./ConnectButton"), { ssr: false });

export default function ConnectButtonWrapper() {
  return <ConnectButton />;
}
