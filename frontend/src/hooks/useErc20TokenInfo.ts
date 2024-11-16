import { useReadContract } from "wagmi";
import { Adresse } from "../utils/type";
import { ERC20_ABI } from "../utils/ERC20_ABI";

export function useErc20TokenInfo({
  tokenAddress,
  userAddress,
  spenderAddress,
}: {
  tokenAddress: Adresse;
  userAddress?: Adresse;
  spenderAddress?: Adresse;
}) {
  const { data: balance, refetch: refetchBalance } = useReadContract({
    abi: ERC20_ABI,
    address: tokenAddress,
    functionName: "balanceOf",
    args: [userAddress || ("" as Adresse)],
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: ERC20_ABI,
    address: tokenAddress,
    functionName: "allowance",
    args: [userAddress || ("" as Adresse), spenderAddress || ("" as Adresse)],
    query: { enabled: !!spenderAddress },
  });

  return {
    balance,
    allowance,
    refetchBalance,
    refetchAllowance,
  };
}
