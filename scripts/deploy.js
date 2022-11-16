const chalk = require("chalk");
const { ethers, upgrades } = require("hardhat");


const main = async () => {
  let [deployer] = await ethers.getSigners();
  let errorFlag = false
  let errorMsg
  console.log("\n\n 📡 Deploying...\n");
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:",  ethers.utils.formatEther(await deployer.getBalance()).toString());

  // console.log(` 🛰  Deploying: Paymaster, STEP 1`);
  // const Paymaster = await ethers.getContractFactory("AcceptEverythingPaymaster");
  // let pay = await Paymaster.deploy();
  // await pay.deployed();
  // await pay.setTrustedForwarder(forwarder)
  // await pay.setRelayHub(relayHub)
  // console.log(
  //   " 📄",
  //   chalk.cyan("Paymaster"),
  //   "deployed to:",
  //   chalk.magenta(pay.address),
  // );

  console.log(` 🛰  Deploying: nft contract, STEP 2`);
  const NFT = await ethers.getContractFactory("FM9XaMutagen");
  let nft = await NFT.deploy();
  console.log(
    " 📄",
    chalk.cyan("nft"),
    "deployed to:",
    chalk.magenta(nft.address),
  );
  await nft.claim()
  // Verify implementation on etherscan
  console.log(`Attempting to verify implementation contract with etherscan`);

  // try {
  //   await hre.run("verify:verify", { address: pay.address });
  // } catch (error) {
  //   console.log(error)
  // }

  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};



// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
