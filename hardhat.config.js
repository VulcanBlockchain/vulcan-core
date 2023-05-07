require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
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
      accounts: ["6a8a66f2a7a76a55b042060740d4777383b4fb3ac4a51370358cf85d6e1ed79f"]
    }  
   }
   //networks:{
   //  rinkeby:{
   //    url: INFURA_URL,
   //    accounts:[`0x${PRIVATE_KEY}`]
   //  }
   //}
 };