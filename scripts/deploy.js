const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const VulcanCore = await hre.ethers.getContractFactory('VulcanCore');
  const vulcanCore = await VulcanCore.deploy(0);
  await vulcanCore.deployed();
  await vulcanCore.populateRebaseTable();
  console.log(await vulcanCore.rebaseInfo.call());
  console.log('VulcanCore deployed to:', vulcanCore.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });