import { signMessage } from "wagmi/actions";
import { wagmiConfig } from "../config/wagmiConfig";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface DCASubscription {
  walletAddress: string;
  dayOfMonth: number;
  amount: string;
}

export const dcaService = {
  async subscribe(walletAddress: string, dayOfMonth: number, amount: string): Promise<DCASubscription> {
    const message = "Sign this message to subscribe to DCA orders.";
    const signature = await signMessage(wagmiConfig, { message });

    const response = await fetch(`${BACKEND_URL}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signature,
        walletAddress,
        dayOfMonth,
        amount,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to subscribe to DCA");
    }

    return response.json();
  },

  async unsubscribe(walletAddress: string): Promise<void> {
    const message = "Sign this message to unsubscribe from DCA orders.";
    const signature = await signMessage(wagmiConfig, { message });

    const response = await fetch(`${BACKEND_URL}/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signature,
        walletAddress,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to unsubscribe from DCA");
    }
  },

  async getSubscription(walletAddress: string): Promise<DCASubscription | null> {
    const response = await fetch(`${BACKEND_URL}/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress,
      }),
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch DCA subscription");
    }

    const data = await response.json();
    return data.subscription;
  },
};
