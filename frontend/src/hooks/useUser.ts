import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { GetUserQuery } from "../__generated__/graphql";

const USER_QUERY = gql(`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      totalStake
      totalReward
      depositEvents {
        id
        amount
        timestamp
      }
      withdrawEvents {
        id
        amount
        timestamp
      }
      rewardEvents {
        id
        amount
        timestamp
      }
    }
  }
`);

export function useUser(address?: string) {
  return useQuery<GetUserQuery>(USER_QUERY, {
    variables: { id: address?.toLowerCase() || "" },
    skip: !address,
  });
}
