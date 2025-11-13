# Tutorial: Using this Ethereum Node.js Demo

This repository contains a minimal Node.js example that demonstrates sending Ether using Web3.js. It’s intended as a quick-start guide for learning how to interact with Ethereum from JavaScript.

## Prerequisites
- Node.js (LTS) installed: https://nodejs.org/
- Basic familiarity with the command line
- A Ethereum node endpoint (HTTP/S) to connect to (see Configuration below)
- If you plan to use real accounts, secure handling of private keys is essential.

Note: The demo contains example wallets and a placeholder node URL. Do not expose real private keys in source files.

## Quick Start
- Initialize a fresh npm project (optional but recommended):
  - `mkdir my-demo && cd my-demo`
  - `npm init -y`
- Install Web3.js:
  - `npm install web3`
- Copy or inspect the demo script:
  - The script is `ethtr.js` in the repo root.
- Create a node endpoint URL and replace the placeholder in `ethtr.js`:
  - Open `ethtr.js` and replace `"LINK_TO_YOUR_NODE"` with your Ethereum node URL (e.g., Infura, Alchemy, or a local node).
- Use environment variables for sensitive data (recommended) or keep keys in a secure vault:
  - Do not commit private keys to version control.
- Run the script:
  - `node ethtr.js`
- You should see either a transaction hash or an error in the console.

## Configuration Details
- The script defines two example wallets:
  - `walletA` and `walletB` with addresses and private keys (hard-coded in the file).
- The `sendETH` function connects to a Web3 provider and constructs a basic ETH transfer:
  - It uses a 21000 gas limit for a simple transfer.
- Important: You must replace `LINK_TO_YOUR_NODE` with a real provider URL for the script to work.
- For security and reuse, consider reading keys from environment variables or a dedicated secret store.

## Example Changes (sanitized)
- In `ethtr.js`, update the node URL:
  - `const web3 = new Web3("https://mainnet.infura.io/v3/YOUR-PROJECT-ID")`
- Replace private keys with environment-based reads (example pattern):
  - `const PRIVATE_KEY = process.env.PRIVATE_KEY_A`
- Then call:
  - `sendETH(walletA.address, walletB.address, PRIVATE_KEY, "0.05")`

## Security Guidelines
- Never commit real private keys in the repository.
- Use environment variables or a secrets manager for keys.
- Validate input amounts and ensure addresses are correct before sending.

## Extending the Demo
- Add support for multiple networks (e.g., Ropsten, Rinkeby) by parameterizing the network URL.
- Include error handling and retries.
- Add unit tests around transaction object construction (mock Web3).

## Troubleshooting
- If you see an error like "provider not found" or "Cannot read property 'sendSignedTransaction' of undefined":
  - Ensure the node URL is correct and the provider supports the required methods.
- If the transaction fails due to insufficient funds, adjust the amount or account balance.

## Contributing
- Open a feature branch, add tests, and submit a pull request.
- Document any changes in this file to help future contributors.

## File Overview
- `ethtr.js` — Demo script that demonstrates sending ETH using Web3.js.
- `hi.txt` — Placeholder content used as a simple file in the repo.

Happy coding!

