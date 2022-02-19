const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

const TOKEN_URI = "testUri";

describe("CommunityLedger", () => {
  let xyzToken;
  let ledger;
  let owner;
  let user1;
  let mintPrice;

  before(async () => {
    const CommunityPowerToken = await ethers.getContractFactory("CommunityPowerToken");
    [owner, user1] = await ethers.getSigners();

    xyzToken = await upgrades.deployProxy(CommunityPowerToken, [], {
      initializer: "initialize",
    });

    const CommunityLedger = await ethers.getContractFactory("CommunityLedger");
    ledger = await upgrades.deployProxy(CommunityLedger, [xyzToken.address], {
      initializer: "initialize",
    });
    mintPrice = await ledger.mintPrice();
  });

  // we assume that the owner of token contract initially has all the toke supply

  describe("Deployment", () => {
    it("[Community Power Token]: Should have expected name and symbol", async () => {
      expect(await ledger.owner()).to.equal(owner.address);

      expect(await xyzToken.name()).to.equal("Community Power Token");
      expect(await xyzToken.symbol()).to.equal("XYZ");
    });

    it("[Community Power Token]: Deployer address should have all the total supply", async () => {
      const ownerBalance = await xyzToken.balanceOf(owner.address);
      expect(await xyzToken.totalSupply()).to.equal(ownerBalance);
    });

    it("[Community Ledger Contract]: Should have the expected params set", async () => {
      expect(await ledger.name()).to.equal("xBrick");
      expect(await ledger.symbol()).to.equal("xBRK");
      expect(mintPrice).to.equal(ethers.utils.parseUnits("10", 18));
      expect(await ledger.communityToken()).to.equal(xyzToken.address);
      expect(await ledger.owner()).to.equal(owner.address);
    });
  });

  describe("Mint flow", () => {
    it("Should not allow minting if minting is not enabled", async () => {
      await expect(ledger.connect(user1).mint(TOKEN_URI)).to.be.revertedWith("Minting not enabled at the moment");
    });

    it("Should only allow owner enabling minting", async () => {
      expect(await ledger.mintEnabled()).to.equal(false);
      await expect(ledger.connect(user1).setMintingStatus(true)).to.be.revertedWith("Ownable: caller is not the owner");
      await ledger.setMintingStatus(true);
    });

    it("Should not permit minting if the account did not approve XYZ funds for contract to spend", async () => {
      expect(await xyzToken.allowance(user1.address, ledger.address)).to.equal(0);
      await expect(ledger.connect(user1).mint(TOKEN_URI)).to.be.revertedWith("ERC20: insufficient allowance");
    });

    it("Should permit user allow ledger contract spend XYZ minting fee on his behalf", async () => {
      expect(await xyzToken.allowance(user1.address, ledger.address)).to.equal(0);
      await xyzToken.connect(user1).approve(ledger.address, mintPrice);
      expect(await xyzToken.allowance(user1.address, ledger.address)).to.equal(mintPrice);
    });

    it("Should not allow minting if the user does not have enough XYZ funds", async () => {
      expect(await xyzToken.balanceOf(user1.address)).to.equal(0);
      await expect(ledger.connect(user1).mint(TOKEN_URI)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it("Should allow minting if the user has enough XYZ funds", async () => {
      expect(await xyzToken.balanceOf(user1.address)).to.equal(0);
      await xyzToken.transfer(user1.address, mintPrice);
      expect(await xyzToken.balanceOf(user1.address)).to.equal(mintPrice);

      await ledger.connect(user1).mint(TOKEN_URI);
      expect(await ledger.balanceOf(user1.address)).to.equal(1);
      expect(await xyzToken.balanceOf(user1.address)).to.equal(0);

      const mintedTokenId = await ledger.tokenOfOwnerByIndex(user1.address, 0);
      expect(await ledger.tokenURI(mintedTokenId)).to.equal(TOKEN_URI);
    });

    it("Should not allow the user mint more than one NFT", async () => {
      expect(await ledger.balanceOf(user1.address)).to.equal(1);
      await expect(ledger.connect(user1).mint(TOKEN_URI)).to.be.revertedWith("Community members not allowed to mint twice");
    });

    it("Should have mint price updated by 3%", async () => {
      const expectedMintPrice = ethers.utils.parseUnits(`${mintPrice * 1.03}`, "wei");
      expect(await ledger.mintPrice()).to.equal(expectedMintPrice);
    });

    it("Should allow owner withdraw total collected mint fee", async () => {
      await expect(ledger.connect(user1).withdrawMintFee()).to.be.revertedWith("Ownable: caller is not the owner");
      const expectedTotalMintFee = await xyzToken.balanceOf(ledger.address);
      const previousOwnerBalance = await xyzToken.balanceOf(owner.address);

      await ledger.withdrawMintFee();
      const currentOwnerBalance = await xyzToken.balanceOf(owner.address);
      expect(currentOwnerBalance.sub(previousOwnerBalance)).to.equal(expectedTotalMintFee);
    });
  });
});
