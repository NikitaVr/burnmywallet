const { expect } = require("chai");
const { ethers } = require("hardhat");
var Web3 = require("web3");

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
var web3 = new Web3(
  Web3.givenProvider || "ws://some.local-or-remote.node:8546"
);

describe("Basic Burn My Wallet Tests", function () {
  var burn;
  var owner, addr1, addr2;

  beforeEach(async function () {
    const BURN = await ethers.getContractFactory("BurnMyWallet");
    burn = await BURN.deploy();
    await burn.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("should allow user to mint BURN token", async function () {
    await burn.mint();
    expect(await burn.balanceOf(owner.address)).to.equal(1);
  });

  it("should not allow user to mint multiple BURN tokens", async function () {
    await burn.mint();
    expect(await burn.balanceOf(owner.address)).to.equal(1);

    await expect(
      burn.mint()
    ).to.be.revertedWith("Err: only one BURN token may be minted per account");
  });

  it("should not allow user to send BURN tokens", async function () {
    await burn.mint();
    expect(await burn.balanceOf(owner.address)).to.equal(1);
    await expect(
      burn["safeTransferFrom(address,address,uint256)"](owner.address, owner.address, 0)
    ).to.be.revertedWith("Err: token is SOUL BOUND");
  });
});
