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

        await expect(burn.mint()).to.be.revertedWith(
            "Err: only one BURN token may be minted per account"
        );
    });

    it("should not allow user to send BURN tokens using safeTransferFrom", async function () {
        await burn.mint();
        expect(await burn.balanceOf(owner.address)).to.equal(1);
        await expect(
            burn["safeTransferFrom(address,address,uint256)"](
                owner.address,
                addr1.address,
                0
            )
        ).to.be.revertedWith("Err: token is SOUL BOUND");
    });

    it("should not allow user to send BURN tokens using transfer", async function () {
        await burn.mint();
        expect(await burn.balanceOf(owner.address)).to.equal(1);
        await expect(
            burn.transferFrom(owner.address, addr1.address, 0)
        ).to.be.revertedWith("Err: token is SOUL BOUND");
    });

    it("should allow user to submit signed burn message from different wallet", async function () {
        const signer = addr1;
        const to = burn.address;
        const amount = 0;
        const message = await burn.burnMessage();
        const nonce = 123;
        const hash = await burn.getMessageHash(to, amount, message, nonce);
        const signature = await signer.signMessage(ethers.utils.arrayify(hash));

        await burn.burnWithMessageSignature(signer.address, nonce, signature);

        expect(await burn.balanceOf(signer.address)).to.equal(1);
    });

    it("reverts when signature does not match signer", async function () {
        const signer = addr1;
        const to = burn.address;
        const amount = 0;
        const message = await burn.burnMessage();
        const nonce = 123;
        const hash = await burn.getMessageHash(to, amount, message, nonce);
        const signature = await signer.signMessage(ethers.utils.arrayify(hash));
        await expect(burn.burnWithMessageSignature(addr2.address, nonce, signature)).to.be.revertedWith("Invalid Signature");
    });
});
