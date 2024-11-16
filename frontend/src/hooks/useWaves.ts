import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { GetWavesQuery } from "../__generated__/graphql";

const WAVES_QUERY = gql(`query GetWaves {
    waves {
      id
      rewardsDistributed
      randomSeed
      totalReward
      totalStake
      stakes {
        user {
          id
          totalStake
          totalReward
        }
        id
        amount
      }
      winners {
        id
        user {
          id
        }
        odds
      }
    }
}`);

export function useWaves() {
  return useQuery<GetWavesQuery>(WAVES_QUERY);
}
