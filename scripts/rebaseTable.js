const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  await hre.run('compile');
  const VulcanCore = await hre.ethers.getContractFactory('VulcanCore');
  const vulcanCore = await VulcanCore.attach("0x1bC6DfDf5Be5F8dd921B7DFC5f6e517687b480Cf");

  for(let i=0;i<2940;i++) { // from 739840 / 250 
    await vulcanCore.populateRebaseTable();
    await vulcanCore.populateRebaseTable();
    await vulcanCore.populateRebaseTable();
    await vulcanCore.populateRebaseTable();
    await vulcanCore.populateRebaseTable();
    console.log(i);
    await sleep(5000);
  }


}

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });