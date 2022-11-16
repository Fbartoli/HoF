const chalk = require("chalk");
const { ethers, upgrades } = require("hardhat");


const main = async () => {
  let [deployer] = await ethers.getSigners();
  let contractName = 'HoF'
  console.log("\n\n 📡 Deploying...\n");
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:",  ethers.utils.formatEther(await deployer.getBalance()).toString());

  console.log(` 🛰  Deploying: nft contract, STEP 2`);
  const NFT = await ethers.getContractFactory(contractName);
  let nft = await NFT.deploy('https://ipfs.io/ipfs/QmNdQpZp7vmv8CZtUgLoCxnYPZQq5LxPQTshvPZPJh5HKJ/', '0x0000000000000000000000000000000000000000');
  console.log(
    " 📄",
    chalk.cyan("nft"),
    "deployed to:",
    chalk.magenta(nft.address),
  );
  // Verify implementation on etherscan
  console.log(`Attempting to verify implementation contract with etherscan`);
  await new Promise((resolve) => setTimeout(resolve, 60000));
  try {
    await hre.run("verify:verify", { address: nft.address, constructorArguments: ['https://ipfs.io/ipfs/QmNdQpZp7vmv8CZtUgLoCxnYPZQq5LxPQTshvPZPJh5HKJ/', '0x0000000000000000000000000000000000000000'] }, );
  } catch (error) {
    console.log(error)
  }

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
