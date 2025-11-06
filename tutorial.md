# Ethereum Transactions Tutorial

This repository contains a minimal Node.js example that demonstrates how to send an Ethereum transaction with the `web3` library. Follow this guide to understand the basics of Ethereum and to learn how to run the sample script.

## What is Ethereum?

Ethereum is a decentralized blockchain platform that lets anyone deploy smart contracts and interact with them using its native currency, ether (ETH). The network is secured by thousands of nodes that all maintain a shared ledger. Every transaction you broadcast must be digitally signed and pays a small fee (gas) in ETH to compensate the network for processing it.

## Prerequisites

- Node.js 16+ and npm installed locally.
- An Ethereum account whose private key you control. For safety, use test accounts and never reuse real funds from this demo.
- Access to an Ethereum node RPC URL (for example, from a provider such as Infura, Alchemy, or Ganache).

Install the only dependency for this project:

```bash
npm install web3
```

## Project Overview

The repository contains `ethtr.js`, a script that:

1. Connects to an Ethereum node via HTTP using Web3.
2. Defines a simple transaction that transfers ETH from one account to another.
3. Signs the transaction locally with the sender's private key.
4. Broadcasts the signed transaction to the network.

## Configure the Script

Open `ethtr.js` and update the placeholders:

- Replace `LINK_TO_YOUR_NODE` with your Ethereum node RPC URL (e.g., `https://mainnet.infura.io/v3/YOUR_KEY` or a testnet URL).
- Update the sample addresses and private keys with your own values. Keep the private key secret—never commit real keys to version control.
- Adjust the `amount` argument in the final `sendETH` call to control how much ETH is sent. On testnets, fund the sender account with faucet ETH first.

Optional safety tips:

- Store secrets in environment variables rather than hard-coding them.
- Use separate wallets for experiments and production activity.

## Run the Example

After configuring the script:

```bash
node ethtr.js
```

If successful, the script logs the transaction hash. You can inspect the transaction on a block explorer (e.g., Etherscan, GoerliScan) by searching for that hash.

## How the Code Works

- **Web3 initialization:** `new Web3("<RPC URL>")` tells Web3 which Ethereum node to use.
- **Transaction object:** Specifies the sender (`from`), recipient (`to`), amount (`value`), and gas limit (`gas`). The value is converted from ether to wei, the smallest ETH unit.
- **Signing:** `web3.eth.accounts.signTransaction` creates a signed payload using the provided private key. The key never leaves your machine.
- **Broadcasting:** `web3.eth.sendSignedTransaction` transmits the signed payload to the network. Once mined, the transaction becomes part of the blockchain.

## Next Steps

- Expand the script to read configuration from environment variables.
- Handle asynchronous errors with `try/catch` instead of callbacks.
- Query balances before and after sending to confirm the transfer.
- Experiment with additional transaction fields, such as specifying `gasPrice` or using EIP-1559 fee parameters.
