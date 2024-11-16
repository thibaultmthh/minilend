![logo](./doc/logo.png)

## What is Tontine?

Tontine is a

## Why Storylus ?

There is no native way to access historical state on Ethereum in a trustless way.
Over 19 million blocks written to Ethereum. Smart contracts can only access the latest 256 blocks representing ~50 minutes of data.
‘Historical data’ refers to anything outside of the last 256 blocks.

## Deployed contracts

| Celo |
| :--: |

| [StakingPool](https://celoscan.io/address/0xAa65A85a674A54bBa3f3a11901b25b1c9150939E)

## Code Highlights

- [Staking Pool Contract](https://github.com/thibaultmthh/minilend/tree/main/hardhat)
- [Subgraph](https://github.com/thibaultmthh/minilend/tree/main/subgraph)
- [FrontEnd](https://github.com/thibaultmthh/minilend/tree/main/frontend)
- [BackEnd](https://github.com/thibaultmthh/minilend/tree/main/backend)
- [WebApp](https://tontine.money/)

## Protocol Usage Demo

The demo is a Capture the (nft) Flag
The NFT is transferred only if an address proves on-chain that it has made more transactions than the current NFT owner during EthDenver
More than 256 Blocks in the past

- [Code](https://github.com/cometh-hq/optimistic-eth-history-prover/tree/main/demo)
- [Live Demo](https://optimistic-eth-history-prover.vercel.app/)

## How it works

### Protocol overview

![protocole-overview](./doc/protocole-overview.png)

### 1- Push a L1 Block Header to l3 in a trustless way

![l1bridge](./doc/l1bridge.png)

### 2- Recursively prove previous blocks

![HistoryProver](./doc/HistoryProver.png)

### 3- All networks that have access to the L3 Rollup state can now attest the validity of a L1 block.

![rollupL1History](./doc/rollupL1History.png)

## Context

This project was developed during the EthDenver 2024 hackathon
