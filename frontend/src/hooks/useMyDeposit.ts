import { useAccount } from "wagmi";
import { useWaves } from "./useWaves";

export default function useMyDeposit() {
  const { data: waves, refetch } = useWaves();
  const { address: userAddress } = useAccount();

  const stackedBalance =
    waves?.waves[waves.waves.length - 1]?.stakes?.find((v) => {
      if (!v) return false;
      return v.user.id.toLocaleLowerCase() === userAddress?.toLocaleLowerCase();
    })?.user?.totalStake || "0";

  return { stackedBalance, refetch };
}
