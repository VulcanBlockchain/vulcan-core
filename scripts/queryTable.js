const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const VulcanCore = await hre.ethers.getContractFactory('VulcanCore');
  const vulcanCore = await VulcanCore.attach("0x1bC6DfDf5Be5F8dd921B7DFC5f6e517687b480Cf");

  for(let i=0;i<735840;i++) { // from 739840 / 250 
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