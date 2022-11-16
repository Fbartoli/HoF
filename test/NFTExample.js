const { ethers } = require("hardhat");

describe("contract",  async function () {

  var signer;
  var client;
  var contractName = 'HoF';

  beforeEach(async () => {
    [signer, client] = await ethers.getSigners();
    const CD = await hre.ethers.getContractFactory("contractName");
    cd = await CD.deploy();
    await cd.deployed();
  });

  it("", async () =>  {
  });
});