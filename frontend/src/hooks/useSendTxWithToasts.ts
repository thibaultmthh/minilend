import { useRef, useState } from "react";

// import { UseToastOptions, useToast } from "@chakra-ui/react";
import { WaitForTransactionReceiptReturnType, waitForTransactionReceipt } from "wagmi/actions";
import { toast } from "sonner";
import { Adresse } from "../utils/type";
import { wagmiConfig } from "../config/wagmiConfig";

export default function useSendTxWithToasts({
  onError,
  onSuccess,
}: {
  onError?: (error: Error) => void;
  onSuccess?: (receipt: WaitForTransactionReceiptReturnType) => void;
} = {}) {
  const toastIdRef = useRef<string | number>();
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  async function sendTxWithToasts(tx: Promise<Adresse>) {
    console.log("sendTxWithToasts", tx);

    // if first transaction, show loading toast
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
    }
    // toastIdRef.current = toast(TOASTS.sending);
    toastIdRef.current = toast.loading("Sending transaction", {
      description: "Please wait while the transaction is sent",
    });

    const hash = await tx.catch((e) => {
      console.error(e);
      setStatus("error");
      toast.error("Error sending transaction", {
        description: "The transaction couldn't be sent. Please try again.",
        id: toastIdRef.current || 0,
      });
      onError?.(e);
      return null;
    });

    if (!hash) {
      throw new Error("Error sending transaction");
    }
    // toast.update(toastIdRef.current || 0, TOASTS.waitingConfirmation);
    toast.loading("Transaction waiting for confirmation", {
      description: "The transaction was sent successfully. Waiting for confirmation.",
      id: toastIdRef.current || 0,
    });

    console.log({ hash });

    const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: hash }).then((r) => {
      console.log("waitForTransactionReceipt", r);
      return r;
    });

    if (receipt.status == "reverted") {
      toast.error("Transaction reverted", {
        description: "The transaction was reverted.",
        id: toastIdRef.current || 0,
      });
      setStatus("error");
      onError?.(new Error("Transaction reverted"));
      throw new Error("Transaction reverted");
    }
    onSuccess?.(receipt);

    toast.success("Transaction confirmed", {
      description: "The transaction was confirmed successfully.",
      id: toastIdRef.current || 0,
    });
    toastIdRef.current = 0;

    setStatus("success");
    return receipt;
  }

  return { sendTxWithToasts, status };
}
