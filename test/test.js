const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy Tokens", function () {
  before(async function () {
    this.accounts = await ethers.getSigners();
    this.owner = this.accounts[0];

    const VulcanCore = await ethers.getContractFactory("VulcanCore");
    this.vulcanCore = await VulcanCore.deploy();
    await this.vulcanCore.deployed();

    const VULToken = await ethers.getContractFactory("xVUL");
    this.vulToken = await VULToken.deploy();
    await this.vulToken.deployed();
  });

  it("Should check properties match constructor", async function () {
    expect(await this.vulToken.name()).to.equal("xVUL");
    expect(await this.vulToken.symbol()).to.equal("xVUL");
  });
});
