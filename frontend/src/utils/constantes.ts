import { Adresse } from "./type";

export const STABLE_STAKING_CONTRACT = process.env.NEXT_PUBLIC_STABLE_STAKING_CONTRACT as Adresse;
export const ERC20_STABLE_CONTRACT = process.env.NEXT_PUBLIC_ERC20_STABLE__CONTRACT as Adresse;
export const ERC20_STABLE_DECIMALS = 18;

export const API_GRAPHQL = process.env.NEXT_PUBLIC_GRAPH_URL;
export const IS_MINI_PAY = process.env.NEXT_PUBLIC_IS_MINI_PAY?.toLowerCase() === "true";
