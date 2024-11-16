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
  protocolMetrics?: Maybe<ProtocolMetrics>;
  protocolMetrics_collection: Array<ProtocolMetrics>;
  stake?: Maybe<Stake>;
  stakes: Array<Stake>;
  user?: Maybe<User>;
  users: Array<User>;
  wave?: Maybe<Wave>;
  waves: Array<Wave>;
  winner?: Maybe<Winner>;
  winners: Array<Winner>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
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

export type Stake = {
  __typename?: 'Stake';
  amount: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
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
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Stake_Filter>>>;
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
  Id = 'id',
  User = 'user',
  UserId = 'user__id',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
  WaveTotalReward = 'wave__totalReward',
  WaveTotalStake = 'wave__totalStake'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  protocolMetrics?: Maybe<ProtocolMetrics>;
  protocolMetrics_collection: Array<ProtocolMetrics>;
  stake?: Maybe<Stake>;
  stakes: Array<Stake>;
  user?: Maybe<User>;
  users: Array<User>;
  wave?: Maybe<Wave>;
  waves: Array<Wave>;
  winner?: Maybe<Winner>;
  winners: Array<Winner>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
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

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  referredUsers?: Maybe<Array<User>>;
  referrer?: Maybe<User>;
  stakes?: Maybe<Array<Stake>>;
  totalReward: Scalars['BigInt']['output'];
  totalStake: Scalars['BigInt']['output'];
  winners?: Maybe<Array<Winner>>;
};


export type UserReferredUsersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<User_Filter>;
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

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
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
};

export enum User_OrderBy {
  Id = 'id',
  ReferredUsers = 'referredUsers',
  Referrer = 'referrer',
  ReferrerId = 'referrer__id',
  ReferrerTotalReward = 'referrer__totalReward',
  ReferrerTotalStake = 'referrer__totalStake',
  Stakes = 'stakes',
  TotalReward = 'totalReward',
  TotalStake = 'totalStake',
  Winners = 'winners'
}

export type Wave = {
  __typename?: 'Wave';
  id: Scalars['ID']['output'];
  randomSeed?: Maybe<Scalars['BigInt']['output']>;
  rewardsDistributed: Scalars['Boolean']['output'];
  stakes: Array<Stake>;
  totalReward: Scalars['BigInt']['output'];
  totalStake: Scalars['BigInt']['output'];
  winners: Array<Winner>;
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

export type Wave_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Wave_Filter>>>;
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
  rewardsDistributed?: InputMaybe<Scalars['Boolean']['input']>;
  rewardsDistributed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  rewardsDistributed_not?: InputMaybe<Scalars['Boolean']['input']>;
  rewardsDistributed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
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
};

export enum Wave_OrderBy {
  Id = 'id',
  RandomSeed = 'randomSeed',
  RewardsDistributed = 'rewardsDistributed',
  Stakes = 'stakes',
  TotalReward = 'totalReward',
  TotalStake = 'totalStake',
  Winners = 'winners'
}

export type Winner = {
  __typename?: 'Winner';
  id: Scalars['ID']['output'];
  odds: Scalars['String']['output'];
  reward: Scalars['BigInt']['output'];
  user: User;
  wave: Wave;
};

export type Winner_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Winner_Filter>>>;
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
  Id = 'id',
  Odds = 'odds',
  Reward = 'reward',
  User = 'user',
  UserId = 'user__id',
  UserTotalReward = 'user__totalReward',
  UserTotalStake = 'user__totalStake',
  Wave = 'wave',
  WaveId = 'wave__id',
  WaveRandomSeed = 'wave__randomSeed',
  WaveRewardsDistributed = 'wave__rewardsDistributed',
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

export type GetWavesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWavesQuery = { __typename?: 'Query', waves: Array<{ __typename?: 'Wave', id: string, rewardsDistributed: boolean, randomSeed?: any | null, totalReward: any, totalStake: any, stakes: Array<{ __typename?: 'Stake', id: string, amount: any, user: { __typename?: 'User', id: string, totalStake: any, totalReward: any } }>, winners: Array<{ __typename?: 'Winner', id: string, odds: string, user: { __typename?: 'User', id: string } }> }> };


export const GetWavesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWaves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewardsDistributed"}},{"kind":"Field","name":{"kind":"Name","value":"randomSeed"}},{"kind":"Field","name":{"kind":"Name","value":"totalReward"}},{"kind":"Field","name":{"kind":"Name","value":"totalStake"}},{"kind":"Field","name":{"kind":"Name","value":"stakes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalStake"}},{"kind":"Field","name":{"kind":"Name","value":"totalReward"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"odds"}}]}}]}}]}}]} as unknown as DocumentNode<GetWavesQuery, GetWavesQueryVariables>;