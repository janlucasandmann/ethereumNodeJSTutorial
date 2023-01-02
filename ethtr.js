const Web3 = require("web3")

// Set up two wallets
const walletA = {
    address: "0x8792f94aa059daf7ad27c22cc29361d67980bea0",
    privateKey: "0x34c408766d2b899c9bb70957df1cf8356bf242b85f8e8321f3dbc2b9ee04f836"
}

const walletB = {
    address: "0xf5e11a0ea8c7283cb1bd9d9bcfe6266a4f283674",
    privateKey: "0x1291f28c2854b0b60e1e500588b66458961cacfb2b463b1ad6575bfd24e04747"
}

function sendETH(fromAddress, toAddress, privateKey, amount) {

    // Connect to an Ethereum node
    const web3 = new Web3("LINK_TO_YOUR_NODE")

    // Create transaction object
    let transaction = {
        from: fromAddress,
        to: toAddress,
        gas: web3.utils.toHex(21000),
        value: web3.utils.toHex(web3.utils.toWei(amount, "ether"))
    }

    // Sign the transaction
    const signTx = new Promise((resolve, reject) => {
        resolve(web3.eth.accounts.signTransaction(transaction, privateKey))
    })

    signTx.then(signedTx => {
        // Send the transaction
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
            if (!error) {
                console.log("Transaction hash: ", hash)
            }
            else {
                console.log("Error: ", error)
            }
        })
    })

}

sendETH(fromAddress = walletA.address, toAddress = walletB.address, privateKey = walletA.privateKey, amount = "0.05")

