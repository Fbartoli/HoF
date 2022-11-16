const { ethers } = require("hardhat");

describe("contract",  async function () {

  var signer;
  var client;

  beforeEach(async () => {
    [signer, client] = await ethers.getSigners();
    const CD = await hre.ethers.getContractFactory("contract");
    cd = await CD.deploy();
    await cd.deployed();
  });

  it("", async () =>  {
  });
});