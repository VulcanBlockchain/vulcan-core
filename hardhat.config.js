require("@nomiclabs/hardhat-waffle");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
    helpers.setNonce(account.address, 0)
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const INFURA_URL = 'https://rinkeby.infura.io/v3/xxxx';
 const PRIVATE_KEY = '';
 
 module.exports = {
   solidity: "0.8.10",
   defaultNetwork: "vulcan",
   networks: {
    hardhat: {
    },
    vulcan: {
      url: "https://test-rpc.vulcanblockchain.com/",
      accounts: ["beefd053a48136935a2625eb4cc9a5ed2e5316b6f0d3f6feb8597356fbb8d604"]
    }  
   }
   //networks:{
   //  rinkeby:{
   //    url: INFURA_URL,
   //    accounts:[`0x${PRIVATE_KEY}`]
   //  }
   //}
 };