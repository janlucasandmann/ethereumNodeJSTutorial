# Ethereum Transaction Tutorial

This repository demonstrates how to send a native Ether (ETH) transaction with Node.js. The guide below gives a quick primer on Ethereum concepts and then walks through configuring and running the provided script.

## 1. Ethereum in a Nutshell

Ethereum is a decentralized, programmable blockchain. The network is maintained by thousands of nodes that agree on a shared state using a consensus protocol. Value on Ethereum is represented as ETH, the network’s native currency.

Key concepts you should know before sending a transaction:

- **Accounts** hold ETH and can initiate transactions. An account is defined by a public address and a private key.
- **Transactions** are signed messages that change state (for example, sending ETH or invoking smart contracts).
- **Gas** is the fee paid to miners/validators for executing a transaction. Gas cost equals `gas_used * gas_price`. In this script we rely on the node’s default gas price and explicitly set the gas limit to `21000`, which is the minimum for a simple ETH transfer.
- **Networks** include the Ethereum mainnet and several testnets (Sepolia, Goerli, Holesky). Always practice on a testnet before attempting mainnet transfers.

## 2. Repository Overview

The project contains a single entry point: `ethtr.js`. It uses the [`web3`](https://web3js.readthedocs.io/) library to:

1. Instantiate a Web3 client that connects to an Ethereum node.
2. Define two wallet objects (`walletA` and `walletB`) with their addresses and private keys.
3. Build, sign, and broadcast a transaction from `walletA` to `walletB`.

```text
ethtr.js
└── sendETH(fromAddress, toAddress, privateKey, amount)
```

## 3. Prerequisites

- Node.js 16+ and npm installed (`node -v`, `npm -v` should both work).
- An Ethereum node endpoint, such as one from Infura, Alchemy, QuickNode, or a locally running node.
- Two funded accounts on your target network. Use test accounts and **never** expose real private keys in source control.

Install the only dependency (Web3):

```bash
npm install web3
```

> Tip: For better key hygiene, store secrets in environment variables or a `.env` file and load them with something like [`dotenv`](https://www.npmjs.com/package/dotenv) instead of hardcoding them.

## 4. Configure the Script

Open `ethtr.js` and update the following sections:

1. **Node URL** – replace `LINK_TO_YOUR_NODE` with your HTTPS or WebSocket endpoint, e.g. `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`.
2. **Wallets** – replace the placeholder addresses and private keys with your own. Ensure the `from` account has enough ETH to cover the amount plus gas.
3. **Amount** – the final line invokes `sendETH` with `"0.05"` ETH. Adjust this value as needed for the network you are using. On testnets you can start with a much smaller amount like `"0.001"`.

The transaction object is crafted with:

```js
let transaction = {
  from: fromAddress,
  to: toAddress,
  gas: web3.utils.toHex(21000),
  value: web3.utils.toHex(web3.utils.toWei(amount, "ether"))
}
```

If you need to control gas price or nonce manually, add `gasPrice`, `nonce`, or `chainId` fields to this object.

## 5. Send a Transaction

1. Ensure the funding account has ETH on the target network.
2. Run the script:

   ```bash
   node ethtr.js
   ```

3. On success the console prints the transaction hash:

   ```
   Transaction hash: 0x...
   ```

4. Use a block explorer (e.g. https://sepolia.etherscan.io/) to look up the hash and confirm the transaction status.

If you see a `replacement transaction underpriced` or `nonce too low` error, make sure no other pending transactions exist and consider specifying the nonce manually.

## 6. Testing on a Public Testnet

1. Mint testnet ETH from a faucet (search for "<network name> faucet").
2. Point the `LINK_TO_YOUR_NODE` value at the testnet endpoint (for Infura or Alchemy you must select the correct network).
3. Replace the wallet addresses with accounts generated for that testnet.
4. Run the script and confirm on the testnet block explorer.

## 7. Security Checklist

- Keep private keys out of version control; environment variables or keystores are safer.
- Rotate keys that have been shared publicly.
- Never send real funds using sample keys provided in tutorials.
- Store endpoints and secrets outside the code if you publish this project.

With these configurations in place, you can reliably send ETH transactions via Node.js using the `web3` library. Once comfortable on testnets, you can adapt the same flow for mainnet, remembering to double-check gas fees and account balances before executing transactions with real value.
