# Ethereum Basics and Transaction Walkthrough

This repository demonstrates how to send Ether between two accounts with Node.js and the Web3.js library. The guide below explains the fundamentals of Ethereum, the structure of the provided script, and the practical steps required to broadcast a transaction.

## 1. Understanding Ethereum
- **Ethereum network**: A decentralized, programmable blockchain where participants run smart contracts and transfer value using its native currency, Ether (ETH).
- **Accounts**: There are externally owned accounts (EOAs) controlled by private keys and contract accounts controlled by code. Transactions originate from EOAs.
- **Gas and fees**: Every transaction consumes gas, which is paid with ETH. Gas ensures scarce computational resources are allocated fairly.
- **Nodes and RPC endpoints**: Interacting with Ethereum requires an RPC (Remote Procedure Call) endpoint exposed by a node. You can run your own node or use a hosted provider such as Infura, Alchemy, or the public endpoint from a local test network like Ganache or Hardhat.
- **Test networks**: For experimentation, prefer using a testnet (Sepolia, Holesky, etc.) or a local development chain to avoid risking real funds.

## 2. Repository Overview
The project contains a single script, `ethtr.js`, that:
- Imports Web3.
- Defines two sample wallets.
- Creates and signs a simple Ether transfer (`sendETH`).
- Broadcasts the signed transaction.

> **Security note**: Never commit real private keys. The keys in `ethtr.js` are placeholders and should be replaced with your own test accounts. Protect sensitive values with environment variables or secure storage.

## 3. Prerequisites
- Node.js (v16 or newer recommended).
- npm or yarn.
- Installed dependency: `web3` (v1.x).
- RPC URL for the network you want to use.
- Two EOAs on that network with enough ETH to cover the amount you plan to send plus gas.

Install dependencies from the project root:

```bash
npm install web3
```

If you do not already have a Node project initialized, run `npm init -y` first.

## 4. Configure the Script
Edit `ethtr.js` to use your own account information and network endpoint.

```js
const Web3 = require("web3")

const walletA = {
    address: "0xYourSenderAddress",
    privateKey: "0xYourSenderPrivateKey"
}

const walletB = {
    address: "0xRecipientAddress"
}

const web3 = new Web3("https://your-rpc-endpoint")
```

- Replace `walletA` with the sender account that has ETH.
- Set `walletB.address` to the recipient.
- Substitute `"https://your-rpc-endpoint"` with your provider URL. Examples include Infura (`https://sepolia.infura.io/v3/<key>`), Alchemy, or `http://127.0.0.1:8545` for a local chain.
- To keep credentials out of source control, store them in environment variables and load them (for example with `dotenv`) instead of hardcoding strings.

## 5. How `sendETH` Works
`ethtr.js` defines the `sendETH` helper:

```js
function sendETH(fromAddress, toAddress, privateKey, amount) {
    const web3 = new Web3("LINK_TO_YOUR_NODE")

    const transaction = {
        from: fromAddress,
        to: toAddress,
        gas: web3.utils.toHex(21000),
        value: web3.utils.toHex(web3.utils.toWei(amount, "ether"))
    }

    web3.eth.accounts
        .signTransaction(transaction, privateKey)
        .then(signedTx => {
            return web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        })
        .then(receipt => {
            console.log("Transaction hash:", receipt.transactionHash)
        })
        .catch(error => {
            console.error("Error broadcasting transaction:", error)
        })
}
```

- **Transaction object**: Specifies sender, recipient, a fixed gas limit of 21,000 (the cost of a basic ETH transfer), and converts the human-readable amount (in ETH) to Wei, the smallest unit.
- **Signing**: `web3.eth.accounts.signTransaction` signs locally using the sender's private key so the RPC node never sees the key.
- **Broadcasting**: `web3.eth.sendSignedTransaction` submits the signed raw transaction to the network and returns a promise resolving to the transaction receipt.

## 6. Run a Transaction
1. Update `ethtr.js` with your configuration.
2. From the project root, run the script:

    ```bash
    node ethtr.js
    ```

3. On success, the script prints the transaction hash. Use an explorer (Etherscan for mainnet, Sepolia Etherscan for testnet, or your local chain's UI) to verify the transfer.

If the script throws an error:
- Check that the sender account balance covers both the `amount` and gas fees.
- Confirm the RPC URL is reachable and matches the network that holds your accounts.
- Ensure the provided private key corresponds to the sender address and includes the `0x` prefix.

## 7. Recommended Enhancements
- **Environment variables**: Externalize private keys and RPC URLs via `.env` files.
- **Dynamic gas pricing**: Query `web3.eth.getGasPrice()` and include `gasPrice` in the transaction to avoid relying on defaults.
- **Nonce management**: Set `nonce` explicitly (via `web3.eth.getTransactionCount`) to handle multiple transactions in parallel.
- **Error handling**: Add retries or more granular logging for production-grade tooling.

## 8. Next Steps
- Explore sending ERC-20 token transfers by interacting with token contracts and calling `transfer`.
- Learn to deploy and interact with smart contracts using `web3.eth.Contract`.
- Experiment on local development networks (Hardhat, Foundry, Ganache) for faster feedback loops.

By following the steps above, you can adapt the included script to automate Ethereum transfers safely while understanding each moving piece of the transaction pipeline.

