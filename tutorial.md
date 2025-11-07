# Ethereum Transaction Tutorial

This repository contains a minimal Node.js script that demonstrates how to broadcast a raw Ethereum transaction with the [`web3`](https://www.npmjs.com/package/web3) library. The notes below explain the fundamentals of Ethereum, show how the provided code works, and walk through the exact steps required to perform a transfer between two accounts.

## 1. Ethereum in a Nutshell

- **What it is:** Ethereum is a decentralized blockchain where every node keeps the same state (account balances, smart contract storage, etc.). Participants agree on that state by executing the same transactions inside blocks.
- **Accounts:** Every account has an `address` derived from a 32-byte private key. Externally Owned Accounts (EOAs) — like the two wallets in this repo — initiate transactions by signing them off-chain with their private key.
- **Transactions:** A transaction requests a state change (e.g., sending ETH). After you sign and broadcast it, miners/validators include it in a block, deduct gas fees, and update balances.
- **Gas:** Each transaction consumes gas (a unit that measures computation). You pay gas in ETH, which incentivizes validators to process your transaction and prevents spam.

## 2. Repository Overview

```
.
├── ethtr.js    # Node.js script that prepares, signs, and broadcasts a transaction
└── hi.txt
```

The tutorial focuses on `ethtr.js`, which exposes a helper `sendETH` function and invokes it once at the bottom of the file.

## 3. Prerequisites

- Node.js 18+ (comes with the `node` runtime and the `npm` package manager).
- An Ethereum RPC endpoint. You can use:
  - A hosted provider such as [Infura](https://www.infura.io/), [Alchemy](https://www.alchemy.com/), or [QuickNode](https://www.quicknode.com/).
  - A self-hosted client such as `geth` or `nethermind`.
  - A public testnet endpoint (Sepolia, Goerli) for experimentation.
- Two Ethereum accounts with private keys. The repo ships with demo keys that should only be used on a test network.

> ⚠️ **Security reminder:** Never expose mainnet private keys or reuse them after publishing. Store secrets in environment variables or `.env` files that stay out of version control.

## 4. Install Dependencies

Inside the repository directory, install the single dependency used by `ethtr.js`:

```bash
npm init -y          # optional, creates package.json for convenience
npm install web3
```

The script imports Web3 via CommonJS: `const Web3 = require("web3")`.

## 5. Configure Your Wallets and Provider

Open `ethtr.js` and locate the configuration block:

```javascript
const walletA = {
    address: "0x8792f94aa059daf7ad27c22cc29361d67980bea0",
    privateKey: "0x34c408766d2b899c9bb70957df1cf8356bf242b85f8e8321f3dbc2b9ee04f836"
};

const walletB = {
    address: "0xf5e11a0ea8c7283cb1bd9d9bcfe6266a4f283674",
    privateKey: "0x1291f28c2854b0b60e1e500588b66458961cacfb2b463b1ad6575bfd24e04747"
};
```

Replace these demo credentials with your own testnet accounts. Keep the `0x` prefix on both addresses and private keys.

Next, configure the RPC URL by replacing the placeholder string `LINK_TO_YOUR_NODE` with your endpoint. Examples:

- Infura Sepolia HTTPS URL (`https://sepolia.infura.io/v3/<YOUR_PROJECT_ID>`)
- Local node (`http://127.0.0.1:8545`)

If your provider requires authentication headers or custom options, instantiate Web3 accordingly (e.g., `new Web3(new Web3.providers.HttpProvider(url, { headers: { ... } }))`).

## 6. Understand the sendETH Helper

The `sendETH` function (defined in `ethtr.js:13-44`) does the following:

1. Instantiates a Web3 client using your RPC URL.
2. Builds a bare-bones transaction with fixed gas (21,000 is the cost of a simple ETH transfer) and a value converted from Ether to Wei via `web3.utils.toWei`.
3. Signs the transaction locally with `web3.eth.accounts.signTransaction`.
4. Broadcasts the signed payload using `web3.eth.sendSignedTransaction`.

You can adjust fields before signing, for example adding `nonce`, `gasPrice`, or `chainId` if you need explicit control. Web3 will attempt to fill omitted values automatically when the connected node supports it.

## 7. Run the Script

Once the configuration is in place, execute:

```bash
node ethtr.js
```

If the transaction is accepted by the node, the script prints the resulting transaction hash:

```
Transaction hash: 0x...
```

Paste that hash into a block explorer (e.g., https://sepolia.etherscan.io/) to monitor confirmation status, gas usage, and final balance changes.

## 8. Troubleshooting Tips

- **Insufficient funds:** Ensure the sender account (`walletA`) has enough ETH for both the transfer amount and gas fees.
- **Nonce mismatch:** If you send multiple transactions rapidly, explicitly set the `nonce` using `await web3.eth.getTransactionCount(fromAddress)`.
- **Wrong network:** Confirm the RPC URL, chain ID, and faucet currency align (e.g., Sepolia ETH cannot be spent on Goerli).
- **Stuck transaction:** Increase `gasPrice` (for legacy) or `maxFeePerGas`/`maxPriorityFeePerGas` (for EIP-1559) to match current network conditions.

## 9. Next Steps

- Parameterize secrets with environment variables instead of hardcoding them.
- Extend the script to read balances (`web3.eth.getBalance`) before and after the transfer.
- Transition to `ethers.js` if you prefer a different API surface or TypeScript support.
- Explore smart contract interactions by adding ABI definitions and `web3.eth.Contract`.

You now have a working template for broadcasting signed Ethereum transactions via Node.js. Customize it for your own accounts, testnets, or deployment pipelines.
