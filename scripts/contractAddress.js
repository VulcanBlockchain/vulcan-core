const { ethers } = require('hardhat')
const { getContractAddress } = require('@ethersproject/address')

if (process.argv.length < 3) {
    console.log('Usage: contractAddress <deployer address>');
    return;
}

const contractAddress = getContractAddress({from: process.argv[2], nonce: 0});
console.log("contract_address: " + contractAddress);
