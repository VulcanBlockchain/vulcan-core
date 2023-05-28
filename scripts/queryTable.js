const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const VulcanCore = await hre.ethers.getContractFactory('VulcanCore');
  const vulcanCore = await VulcanCore.attach("0x176a6DD29329Af5AC82B8cc9CC4086e9f096A42d");

  for(let i=0;i<100;i++) { // from 739840 / 250 
    let r = await vulcanCore.rebaseLookupByEpoch(i);
    console.log(i, r.toString())
    if (r.toString() == '0') break;
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });