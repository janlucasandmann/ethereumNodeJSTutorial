# Ethereum Overview

Ethereum is an open-source, programmable blockchain designed to run decentralized applications (dApps). It extends Bitcoin’s core idea of a shared ledger by adding a built-in virtual machine and scripting language, enabling developers to deploy self-executing agreements called smart contracts.

## Core Concepts
- **Ether (ETH)** – The native currency used to pay for computation and incentivize validators.
- **Smart contracts** – Code deployed on-chain that defines state and behavior. Contracts execute deterministically: every node reaches the same result for a given input.
- **Ethereum Virtual Machine (EVM)** – A sandboxed runtime that processes smart contract bytecode. Because every node runs the EVM, contract execution is trustless but constrained by performance and cost.
- **Gas** – A metered unit of computational work. Senders pay gas fees (in ETH) to prevent spam and allocate resources. Complex operations consume more gas.
- **Accounts** – Ethereum has two account types: externally owned accounts (EOAs) controlled by private keys, and contract accounts controlled by code.

## How Ethereum Reaches Consensus
- **Blocks** – Transactions and contract calls are batched into blocks. Each block references its parent, forming an immutable chain.
- **Proof of Stake** – Ethereum uses the Proof of Stake (PoS) consensus algorithm. Validators lock ETH as stake, propose blocks, and attest to blocks proposed by others. Misbehavior is penalized via staking slashing.
- **Finality** – After enough validator attestations, blocks become finalized, making them extremely hard to reverse.

## Typical Development Flow
- **Write a contract** – Using a language like Solidity or Vyper, define state variables and functions.
- **Compile** – Tooling (e.g., Hardhat, Truffle, Foundry) compiles source code to EVM bytecode and ABI (Application Binary Interface).
- **Deploy** – A deployment transaction publishes the bytecode to the blockchain, creating a contract address.
- **Interact** – Frontends and scripts call contract functions through JSON-RPC providers (Infura, Alchemy, self-hosted nodes). Calls that change state require transactions and gas; read-only calls are free.

## Network Structure
- **Mainnet** – Hosts real ETH and production dApps.
- **Testnets** – Sepolia and Holesky offer safe environments for testing with faucet ETH.
- **Layer 2** – Rollups such as Optimism, Arbitrum, and Base batch transactions off-chain and post proofs to Ethereum for scalability.

## Use Cases
- **Decentralized finance (DeFi)** – Lending, exchanges, derivatives.
- **NFTs & digital collectibles** – Unique tokenized assets.
- **DAOs** – On-chain governance using smart contracts.
- **Infrastructure** – Identity, storage anchors, oracle networks.

## Learning Resources
- [ethereum.org](https://ethereum.org/en/developers/) – Official documentation, tutorials, and community resources.
- [Solidity Docs](https://docs.soliditylang.org/) – Language specification and examples.
- [Etherscan](https://etherscan.io/) – Blockchain explorer to inspect accounts, contracts, and transactions.

## Running a Node
- **Clients** – Execution clients (e.g., Geth, Nethermind) and consensus clients (e.g., Prysm, Lighthouse) work together to validate the chain.
- **Synchronization** – Full nodes verify every block; archive nodes retain historical state; light clients rely on proofs from full nodes.
- **RPC Interface** – Nodes expose JSON-RPC endpoints (`eth_sendRawTransaction`, `eth_call`, etc.) for applications to submit transactions and query chain data.

## Security Considerations
- **Immutable code** – Deployed contracts cannot be changed unless upgrade patterns are built in.
- **Audits & testing** – Use unit tests, fuzzing, and formal verification to detect bugs before deployment.
- **Key management** – Safeguard private keys with hardware wallets, secure signing services, or smart contract wallets (e.g., multisig).

