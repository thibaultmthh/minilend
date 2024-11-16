/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type DepositEvent = {
  __typename?: 'DepositEvent';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  from: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave?: Maybe<Wave>;
};

export type DepositEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<DepositEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<DepositEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum DepositEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type Event = {
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave?: Maybe<Wave>;
};

export type Event_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Event_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type ProtocolMetrics = {
  __typename?: 'ProtocolMetrics';
  id: Scalars['ID']['output'];
  totalRewardsGiven: Scalars['BigInt']['output'];
  totalStaked: Scalars['BigInt']['output'];
  totalUsers: Scalars['Int']['output'];
};

export type ProtocolMetrics_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProtocolMetrics_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProtocolMetrics_Filter>>>;
  totalRewardsGiven?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewardsGiven_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewardsGiven_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewardsGiven_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewardsGiven_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewardsGiven_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewardsGiven_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewardsGiven_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStaked?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUsers?: InputMaybe<Scalars['Int']['input']>;
  totalUsers_gt?: InputMaybe<Scalars['Int']['input']>;
  totalUsers_gte?: InputMaybe<Scalars['Int']['input']>;
  totalUsers_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalUsers_lt?: InputMaybe<Scalars['Int']['input']>;
  totalUsers_lte?: InputMaybe<Scalars['Int']['input']>;
  totalUsers_not?: InputMaybe<Scalars['Int']['input']>;
  totalUsers_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum ProtocolMetrics_OrderBy {
  Id = 'id',
  TotalRewardsGiven = 'totalRewardsGiven',
  TotalStaked = 'totalStaked',
  TotalUsers = 'totalUsers'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  depositEvent?: Maybe<DepositEvent>;
  depositEvents: Array<DepositEvent>;
  event?: Maybe<Event>;
  events: Array<Event>;
  protocolMetrics?: Maybe<ProtocolMetrics>;
  protocolMetrics_collection: Array<ProtocolMetrics>;
  referralEvent?: Maybe<ReferralEvent>;
  referralEvents: Array<ReferralEvent>;
  rewardEvent?: Maybe<RewardEvent>;
  rewardEvents: Array<RewardEvent>;
  stake?: Maybe<Stake>;
  stakes: Array<Stake>;
  user?: Maybe<User>;
  users: Array<User>;
  wave?: Maybe<Wave>;
  waveEndEvent?: Maybe<WaveEndEvent>;
  waveEndEvents: Array<WaveEndEvent>;
  waveStartEvent?: Maybe<WaveStartEvent>;
  waveStartEvents: Array<WaveStartEvent>;
  waves: Array<Wave>;
  winner?: Maybe<Winner>;
  winners: Array<Winner>;
  withdraw?: Maybe<Withdraw>;
  withdrawEvent?: Maybe<WithdrawEvent>;
  withdrawEvents: Array<WithdrawEvent>;
  withdraws: Array<Withdraw>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryDepositEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDepositEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DepositEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DepositEvent_Filter>;
};


export type QueryEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_Filter>;
};


export type QueryProtocolMetricsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolMetrics_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolMetrics_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolMetrics_Filter>;
};


export type QueryReferralEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryReferralEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ReferralEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ReferralEvent_Filter>;
};


export type QueryRewardEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRewardEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardEvent_Filter>;
};


export type QueryStakeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStakesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Stake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Stake_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type QueryWaveArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWaveEndEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWaveEndEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WaveEndEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WaveEndEvent_Filter>;
};


export type QueryWaveStartEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWaveStartEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WaveStartEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WaveStartEvent_Filter>;
};


export type QueryWavesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Wave_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wave_Filter>;
};


export type QueryWinnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWinnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Winner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Winner_Filter>;
};


export type QueryWithdrawArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWithdrawEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWithdrawEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WithdrawEvent_Filter>;
};


export type QueryWithdrawsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Withdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Withdraw_Filter>;
};

export type ReferralEvent = {
  __typename?: 'ReferralEvent';
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  referredUser: User;
  timestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave?: Maybe<Wave>;
};

export type ReferralEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ReferralEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ReferralEvent_Filter>>>;
  referredUser?: InputMaybe<Scalars['String']['input']>;
  referredUser_?: InputMaybe<User_Filter>;
  referredUser_contains?: InputMaybe<Scalars['String']['input']>;
  referredUser_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  referredUser_ends_with?: InputMaybe<Scalars['String']['input']>;
  referredUser_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  referredUser_gt?: InputMaybe<Scalars['String']['input']>;
  referredUser_gte?: InputMaybe<Scalars['String']['input']>;
  referredUser_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referredUser_lt?: InputMaybe<Scalars['String']['input']>;
  referredUser_lte?: InputMaybe<Scalars['String']['input']>;
  referredUser_not?: InputMaybe<Scalars['String']['input']>;
  referredUser_not_contains?: InputMaybe<Scalars['String']['input']>;
  referredUser_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  referredUser_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  referredUser_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  referredUser_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referredUser_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  referredUser_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  referredUser_starts_with?: InputMaybe<Scalars['String']['input']>;
  referredUser_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ReferralEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  ReferredUser = 'referredUser',
  ReferredUserCreatedAt = 'referredUser__createdAt',
  ReferredUserId = 'referredUser__id',
  ReferredUserLastActionAt = 'referredUser__lastActionAt',
  ReferredUserTotalReward = 'referredUser__totalReward',
  ReferredUserTotalStake = 'referredUser__totalStake',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type RewardEvent = {
  __typename?: 'RewardEvent';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  odds: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave?: Maybe<Wave>;
};

export type RewardEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RewardEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  odds?: InputMaybe<Scalars['String']['input']>;
  odds_contains?: InputMaybe<Scalars['String']['input']>;
  odds_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_ends_with?: InputMaybe<Scalars['String']['input']>;
  odds_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_gt?: InputMaybe<Scalars['String']['input']>;
  odds_gte?: InputMaybe<Scalars['String']['input']>;
  odds_in?: InputMaybe<Array<Scalars['String']['input']>>;
  odds_lt?: InputMaybe<Scalars['String']['input']>;
  odds_lte?: InputMaybe<Scalars['String']['input']>;
  odds_not?: InputMaybe<Scalars['String']['input']>;
  odds_not_contains?: InputMaybe<Scalars['String']['input']>;
  odds_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  odds_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  odds_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  odds_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_starts_with?: InputMaybe<Scalars['String']['input']>;
  odds_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<RewardEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RewardEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  Id = 'id',
  Odds = 'odds',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type Stake = {
  __typename?: 'Stake';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave: Wave;
};

export type Stake_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Stake_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Stake_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Stake_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  depositEvent?: Maybe<DepositEvent>;
  depositEvents: Array<DepositEvent>;
  event?: Maybe<Event>;
  events: Array<Event>;
  protocolMetrics?: Maybe<ProtocolMetrics>;
  protocolMetrics_collection: Array<ProtocolMetrics>;
  referralEvent?: Maybe<ReferralEvent>;
  referralEvents: Array<ReferralEvent>;
  rewardEvent?: Maybe<RewardEvent>;
  rewardEvents: Array<RewardEvent>;
  stake?: Maybe<Stake>;
  stakes: Array<Stake>;
  user?: Maybe<User>;
  users: Array<User>;
  wave?: Maybe<Wave>;
  waveEndEvent?: Maybe<WaveEndEvent>;
  waveEndEvents: Array<WaveEndEvent>;
  waveStartEvent?: Maybe<WaveStartEvent>;
  waveStartEvents: Array<WaveStartEvent>;
  waves: Array<Wave>;
  winner?: Maybe<Winner>;
  winners: Array<Winner>;
  withdraw?: Maybe<Withdraw>;
  withdrawEvent?: Maybe<WithdrawEvent>;
  withdrawEvents: Array<WithdrawEvent>;
  withdraws: Array<Withdraw>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionDepositEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDepositEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DepositEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DepositEvent_Filter>;
};


export type SubscriptionEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Event_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Event_Filter>;
};


export type SubscriptionProtocolMetricsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolMetrics_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolMetrics_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolMetrics_Filter>;
};


export type SubscriptionReferralEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionReferralEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ReferralEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ReferralEvent_Filter>;
};


export type SubscriptionRewardEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRewardEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardEvent_Filter>;
};


export type SubscriptionStakeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStakesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Stake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Stake_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type SubscriptionWaveArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWaveEndEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWaveEndEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WaveEndEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WaveEndEvent_Filter>;
};


export type SubscriptionWaveStartEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWaveStartEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WaveStartEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WaveStartEvent_Filter>;
};


export type SubscriptionWavesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Wave_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wave_Filter>;
};


export type SubscriptionWinnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWinnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Winner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Winner_Filter>;
};


export type SubscriptionWithdrawArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWithdrawEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWithdrawEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WithdrawEvent_Filter>;
};


export type SubscriptionWithdrawsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Withdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Withdraw_Filter>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['BigInt']['output'];
  depositEvents?: Maybe<Array<DepositEvent>>;
  id: Scalars['ID']['output'];
  lastActionAt: Scalars['BigInt']['output'];
  referralEvents?: Maybe<Array<ReferralEvent>>;
  referredUsers?: Maybe<Array<User>>;
  referrer?: Maybe<User>;
  rewardEvents?: Maybe<Array<RewardEvent>>;
  stakes?: Maybe<Array<Stake>>;
  totalReward: Scalars['BigInt']['output'];
  totalStake: Scalars['BigInt']['output'];
  winners?: Maybe<Array<Winner>>;
  withdrawEvents?: Maybe<Array<WithdrawEvent>>;
  withdraws?: Maybe<Array<Withdraw>>;
};


export type UserDepositEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DepositEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DepositEvent_Filter>;
};


export type UserReferralEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ReferralEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReferralEvent_Filter>;
};


export type UserReferredUsersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<User_Filter>;
};


export type UserRewardEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RewardEvent_Filter>;
};


export type UserStakesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Stake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Stake_Filter>;
};


export type UserWinnersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Winner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Winner_Filter>;
};


export type UserWithdrawEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawEvent_Filter>;
};


export type UserWithdrawsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Withdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Withdraw_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositEvents_?: InputMaybe<DepositEvent_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lastActionAt?: InputMaybe<Scalars['BigInt']['input']>;
  lastActionAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastActionAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastActionAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastActionAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastActionAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastActionAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastActionAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  referralEvents_?: InputMaybe<ReferralEvent_Filter>;
  referredUsers_?: InputMaybe<User_Filter>;
  referrer?: InputMaybe<Scalars['String']['input']>;
  referrer_?: InputMaybe<User_Filter>;
  referrer_contains?: InputMaybe<Scalars['String']['input']>;
  referrer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  referrer_ends_with?: InputMaybe<Scalars['String']['input']>;
  referrer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  referrer_gt?: InputMaybe<Scalars['String']['input']>;
  referrer_gte?: InputMaybe<Scalars['String']['input']>;
  referrer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referrer_lt?: InputMaybe<Scalars['String']['input']>;
  referrer_lte?: InputMaybe<Scalars['String']['input']>;
  referrer_not?: InputMaybe<Scalars['String']['input']>;
  referrer_not_contains?: InputMaybe<Scalars['String']['input']>;
  referrer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  referrer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  referrer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  referrer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referrer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  referrer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  referrer_starts_with?: InputMaybe<Scalars['String']['input']>;
  referrer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardEvents_?: InputMaybe<RewardEvent_Filter>;
  stakes_?: InputMaybe<Stake_Filter>;
  totalReward?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStake?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  winners_?: InputMaybe<Winner_Filter>;
  withdrawEvents_?: InputMaybe<WithdrawEvent_Filter>;
  withdraws_?: InputMaybe<Withdraw_Filter>;
};

export enum User_OrderBy {
  CreatedAt = 'createdAt',
  DepositEvents = 'depositEvents',
  Id = 'id',
  LastActionAt = 'lastActionAt',
  ReferralEvents = 'referralEvents',
  ReferredUsers = 'referredUsers',
  Referrer = 'referrer',
  ReferrerCreatedAt = 'referrer__createdAt',
  ReferrerId = 'referrer__id',
  ReferrerLastActionAt = 'referrer__lastActionAt',
  ReferrerTotalReward = 'referrer__totalReward',
  ReferrerTotalStake = 'referrer__totalStake',
  RewardEvents = 'rewardEvents',
  Stakes = 'stakes',
  TotalReward = 'totalReward',
  TotalStake = 'totalStake',
  Winners = 'winners',
  WithdrawEvents = 'withdrawEvents',
  Withdraws = 'withdraws'
}

export type Wave = {
  __typename?: 'Wave';
  blockNumber: Scalars['BigInt']['output'];
  depositEvents?: Maybe<Array<DepositEvent>>;
  endEvent?: Maybe<WaveEndEvent>;
  endedAt?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['ID']['output'];
  randomSeed?: Maybe<Scalars['BigInt']['output']>;
  rewardEvents?: Maybe<Array<RewardEvent>>;
  rewardsDistributed: Scalars['Boolean']['output'];
  stakes: Array<Stake>;
  startEvent?: Maybe<WaveStartEvent>;
  startedAt: Scalars['BigInt']['output'];
  totalReward: Scalars['BigInt']['output'];
  totalStake: Scalars['BigInt']['output'];
  winners: Array<Winner>;
  withdrawEvents?: Maybe<Array<WithdrawEvent>>;
  withdraws: Array<Withdraw>;
};


export type WaveDepositEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DepositEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DepositEvent_Filter>;
};


export type WaveRewardEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RewardEvent_Filter>;
};


export type WaveStakesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Stake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Stake_Filter>;
};


export type WaveWinnersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Winner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Winner_Filter>;
};


export type WaveWithdrawEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawEvent_Filter>;
};


export type WaveWithdrawsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Withdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Withdraw_Filter>;
};

export type WaveEndEvent = {
  __typename?: 'WaveEndEvent';
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  totalParticipants: Scalars['Int']['output'];
  totalRewards: Scalars['BigInt']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave?: Maybe<Wave>;
};

export type WaveEndEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WaveEndEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<WaveEndEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalParticipants?: InputMaybe<Scalars['Int']['input']>;
  totalParticipants_gt?: InputMaybe<Scalars['Int']['input']>;
  totalParticipants_gte?: InputMaybe<Scalars['Int']['input']>;
  totalParticipants_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalParticipants_lt?: InputMaybe<Scalars['Int']['input']>;
  totalParticipants_lte?: InputMaybe<Scalars['Int']['input']>;
  totalParticipants_not?: InputMaybe<Scalars['Int']['input']>;
  totalParticipants_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalRewards?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WaveEndEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Timestamp = 'timestamp',
  TotalParticipants = 'totalParticipants',
  TotalRewards = 'totalRewards',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type WaveStartEvent = {
  __typename?: 'WaveStartEvent';
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  totalStake: Scalars['BigInt']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave?: Maybe<Wave>;
};

export type WaveStartEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WaveStartEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<WaveStartEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStake?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WaveStartEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Timestamp = 'timestamp',
  TotalStake = 'totalStake',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type Wave_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Wave_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositEvents_?: InputMaybe<DepositEvent_Filter>;
  endEvent_?: InputMaybe<WaveEndEvent_Filter>;
  endedAt?: InputMaybe<Scalars['BigInt']['input']>;
  endedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  endedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Wave_Filter>>>;
  randomSeed?: InputMaybe<Scalars['BigInt']['input']>;
  randomSeed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  randomSeed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  randomSeed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  randomSeed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  randomSeed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  randomSeed_not?: InputMaybe<Scalars['BigInt']['input']>;
  randomSeed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewardEvents_?: InputMaybe<RewardEvent_Filter>;
  rewardsDistributed?: InputMaybe<Scalars['Boolean']['input']>;
  rewardsDistributed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  rewardsDistributed_not?: InputMaybe<Scalars['Boolean']['input']>;
  rewardsDistributed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  stakes_?: InputMaybe<Stake_Filter>;
  startEvent_?: InputMaybe<WaveStartEvent_Filter>;
  startedAt?: InputMaybe<Scalars['BigInt']['input']>;
  startedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  startedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalReward?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStake?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  winners_?: InputMaybe<Winner_Filter>;
  withdrawEvents_?: InputMaybe<WithdrawEvent_Filter>;
  withdraws_?: InputMaybe<Withdraw_Filter>;
};

export enum Wave_OrderBy {
  BlockNumber = 'blockNumber',
  DepositEvents = 'depositEvents',
  EndEvent = 'endEvent',
  EndEventBlockNumber = 'endEvent__blockNumber',
  EndEventId = 'endEvent__id',
  EndEventTimestamp = 'endEvent__timestamp',
  EndEventTotalParticipants = 'endEvent__totalParticipants',
  EndEventTotalRewards = 'endEvent__totalRewards',
  EndEventTransactionHash = 'endEvent__transactionHash',
  EndedAt = 'endedAt',
  Id = 'id',
  RandomSeed = 'randomSeed',
  RewardEvents = 'rewardEvents',
  RewardsDistributed = 'rewardsDistributed',
  Stakes = 'stakes',
  StartEvent = 'startEvent',
  StartEventBlockNumber = 'startEvent__blockNumber',
  StartEventId = 'startEvent__id',
  StartEventTimestamp = 'startEvent__timestamp',
  StartEventTotalStake = 'startEvent__totalStake',
  StartEventTransactionHash = 'startEvent__transactionHash',
  StartedAt = 'startedAt',
  TotalReward = 'totalReward',
  TotalStake = 'totalStake',
  Winners = 'winners',
  WithdrawEvents = 'withdrawEvents',
  Withdraws = 'withdraws'
}

export type Winner = {
  __typename?: 'Winner';
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  odds: Scalars['String']['output'];
  reward: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave: Wave;
};

export type Winner_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Winner_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  odds?: InputMaybe<Scalars['String']['input']>;
  odds_contains?: InputMaybe<Scalars['String']['input']>;
  odds_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_ends_with?: InputMaybe<Scalars['String']['input']>;
  odds_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_gt?: InputMaybe<Scalars['String']['input']>;
  odds_gte?: InputMaybe<Scalars['String']['input']>;
  odds_in?: InputMaybe<Array<Scalars['String']['input']>>;
  odds_lt?: InputMaybe<Scalars['String']['input']>;
  odds_lte?: InputMaybe<Scalars['String']['input']>;
  odds_not?: InputMaybe<Scalars['String']['input']>;
  odds_not_contains?: InputMaybe<Scalars['String']['input']>;
  odds_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  odds_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  odds_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  odds_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  odds_starts_with?: InputMaybe<Scalars['String']['input']>;
  odds_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Winner_Filter>>>;
  reward?: InputMaybe<Scalars['BigInt']['input']>;
  reward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reward_not?: InputMaybe<Scalars['BigInt']['input']>;
  reward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Winner_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Odds = 'odds',
  Reward = 'reward',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type Withdraw = {
  __typename?: 'Withdraw';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave: Wave;
};

export type WithdrawEvent = {
  __typename?: 'WithdrawEvent';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  from: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  user: User;
  wave?: Maybe<Wave>;
};

export type WithdrawEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<WithdrawEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<WithdrawEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WithdrawEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type Withdraw_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Withdraw_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Withdraw_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave?: InputMaybe<Scalars['String']['input']>;
  wave_?: InputMaybe<Wave_Filter>;
  wave_contains?: InputMaybe<Scalars['String']['input']>;
  wave_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_gt?: InputMaybe<Scalars['String']['input']>;
  wave_gte?: InputMaybe<Scalars['String']['input']>;
  wave_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_lt?: InputMaybe<Scalars['String']['input']>;
  wave_lte?: InputMaybe<Scalars['String']['input']>;
  wave_not?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains?: InputMaybe<Scalars['String']['input']>;
  wave_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  wave_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with?: InputMaybe<Scalars['String']['input']>;
  wave_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Withdraw_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash',
  User = 'user',
  UserCreatedAt = 'user__createdAt',
  UserId = 'user__id',
  UserLastActionAt = 'user__lastActionAt',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveBlockNumber = 'wave__blockNumber',
  WaveEndedAt = 'wave__endedAt',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveStartedAt = 'wave__startedAt',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, totalStake: any, totalReward: any, depositEvents?: Array<{ __typename?: 'DepositEvent', id: string, amount: any, timestamp: any }> | null, withdrawEvents?: Array<{ __typename?: 'WithdrawEvent', id: string, amount: any, timestamp: any }> | null, rewardEvents?: Array<{ __typename?: 'RewardEvent', id: string, amount: any, timestamp: any }> | null } | null };

export type GetWavesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWavesQuery = { __typename?: 'Query', waves: Array<{ __typename?: 'Wave', id: string, rewardsDistributed: boolean, randomSeed?: any | null, totalReward: any, endedAt?: any | null, totalStake: any, stakes: Array<{ __typename?: 'Stake', id: string, amount: any, user: { __typename?: 'User', id: string, totalStake: any, totalReward: any } }>, winners: Array<{ __typename?: 'Winner', id: string, odds: string, user: { __typename?: 'User', id: string } }> }> };


export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalStake"}},{"kind":"Field","name":{"kind":"Name","value":"totalReward"}},{"kind":"Field","name":{"kind":"Name","value":"depositEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"withdrawEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetWavesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWaves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewardsDistributed"}},{"kind":"Field","name":{"kind":"Name","value":"randomSeed"}},{"kind":"Field","name":{"kind":"Name","value":"totalReward"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalStake"}},{"kind":"Field","name":{"kind":"Name","value":"stakes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalStake"}},{"kind":"Field","name":{"kind":"Name","value":"totalReward"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"odds"}}]}}]}}]}}]} as unknown as DocumentNode<GetWavesQuery, GetWavesQueryVariables>;