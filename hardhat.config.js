require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("hardhat/types");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");
require("hardhat-contract-sizer");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 68,
  },
  networks: {
    hardhat: {
      // mining: {
      //   auto: false,
      //   interval: 5000
      // },
      // accounts:[{privateKey: process.env.MAINNET_PRIVATE_KEY_2, balance:"100000000000000000000000000000000"}],
      forking: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
        accounts: [`${process.env.PRIVATE_KEY}`],
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY_RINKEBY}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/topPCZR1bSyCd0oALRfq01mrIxk4Rhn9`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      timeout: 999999999, // gasPrice: 31000000000
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for Etherscan

    // Obtain one at https://etherscan.io/
    // polygon
    apiKey: "V8M7M5I82SDEFUH3IF2HIEHGUVETVCX4GW",
    // apiKey: `${process.env.ETHERSCAN_API}`
  },
};
