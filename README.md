# Ethereum Node.js Tutorial

This repository contains a small Node.js script that demonstrates how to send Ether between two accounts using the `web3` library.

## What It Does
- Configures two example wallet objects (`walletA` and `walletB`) with addresses and private keys.
- Connects to an Ethereum node via a configurable RPC endpoint (`LINK_TO_YOUR_NODE` placeholder).
- Builds, signs, and broadcasts a simple ETH transfer transaction using `web3.eth.accounts.signTransaction` and `web3.eth.sendSignedTransaction`.
- Logs the resulting transaction hash or any errors returned by the node.

## Getting Started
1. Install dependencies:
   ```bash
   npm install web3
   ```
2. Replace `LINK_TO_YOUR_NODE` in `ethtr.js` with the HTTP or WebSocket URL of the Ethereum node you want to use (for example, a local Ganache instance or a hosted provider).
3. Update the wallet addresses and private keys with values you control, or configure them through a secure secret management mechanism.
4. Run the script:
   ```bash
   node ethtr.js
   ```

## Notes
- Never commit or share real private keys. The keys in `ethtr.js` are placeholders for demonstration only.
- Ensure the sending account is funded with enough ETH on the target network to cover the transfer amount and gas fees.
- For development and testing, consider using a private chain or a testnet such as Goerli or Sepolia.
