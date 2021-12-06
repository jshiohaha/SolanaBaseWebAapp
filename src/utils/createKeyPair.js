const fs = require('fs');
const anchor = require("@project-serum/anchor");

const account = anchor.web3.Keypair.generate();

// console.log('account: ', account.publicKey);
// console.log('account: ', account.secretKey);

fs.writeFileSync('./data/keypair.json', JSON.stringify(account));