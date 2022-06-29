// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { writeFileSync, appendFileSync } = require("fs");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // We get the contract to deploy
  const chainlinkAggregatorTestnet =
    "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";
  const chainlinkAggregatorMainnet =
    "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0";
  const LNQToken = await hre.ethers.getContractFactory("LNQToken");
  const Swap = await hre.ethers.getContractFactory("Swap");
  const [owner] = await hre.ethers.getSigners();
  const lnqToken = await LNQToken.deploy();
  await lnqToken.deployed();
  let swap;
  if (Number(network.chainId) === 137) {
    swap = await Swap.deploy(lnqToken.address, chainlinkAggregatorMainnet);
    await swap.deployed();
  } else {
    swap = await Swap.deploy(lnqToken.address, chainlinkAggregatorTestnet);
    await swap.deployed();
  }
  console.log("LNQ token contract deployed to:", lnqToken.address);
  console.log("Swap contract deployed to:", swap.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
