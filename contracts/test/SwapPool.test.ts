import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import {
  UsdtSwapFactory,
  UsdtSwapFactory__factory,
  UsdtSwapPool,
  UsdtSwapPool__factory,
  ERC20Mock,
  ERC20Mock__factory,
} from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("UsdtSwapPool", function () {
  let owner: SignerWithAddress;
  let client: SignerWithAddress;
  let other: SignerWithAddress;
  let factory: UsdtSwapFactory;
  let usdt: ERC20Mock;
  let token: ERC20Mock;
  let usdtSwapPool: UsdtSwapPool;

  beforeEach(async function () {
    [owner, client, other] = await ethers.getSigners();

    const tokenFactory = new ERC20Mock__factory(owner);
    usdt = await tokenFactory.connect(client).deploy("USDT", "USDT");
    token = await tokenFactory.connect(owner).deploy("Token", "Token");

    const factoryFactory = new UsdtSwapFactory__factory(owner);
    factory = await factoryFactory.deploy(usdt.address);
    const tx = await factory.connect(owner).createPool(token.address);
    const receipt = await tx.wait();
    const poolAddress = receipt.events?.find((event) => event.event === "PoolCreated")?.args?.pool;

    const poolFactory = new UsdtSwapPool__factory(owner);
    usdtSwapPool = poolFactory.attach(poolAddress) as UsdtSwapPool;
  });

  it("should initialize contract with correct values", async function () {
    expect(await usdtSwapPool.owner()).to.equal(owner.address);
    expect(await usdtSwapPool.factory()).to.equal(factory.address);
    expect(await usdtSwapPool.usdt()).to.equal(usdt.address);
    expect(await usdtSwapPool.token()).to.equal(token.address);
    expect(await usdtSwapPool.maxOutLock()).to.equal(0);
    expect(await usdtSwapPool.totalSwap()).to.equal(0);
    expect(await usdtSwapPool.price()).to.equal(0);
    expect(await usdtSwapPool.swapAccountsCount()).to.equal(0);
  });

  it("should swap USDT for tokens", async function () {
    const usdtAmount = ethers.utils.parseEther("100");
    const tokenAmount = ethers.utils.parseUnits("50", 18);
    const maxOutLock = ethers.utils.parseUnits("100", 18);
    const price = ethers.utils.parseUnits("2", 18);

    await token.connect(owner).transfer(usdtSwapPool.address, tokenAmount);
    await usdt.connect(client).approve(usdtSwapPool.address, usdtAmount);
    await usdtSwapPool.connect(owner).setMaxOutLock(maxOutLock);
    await usdtSwapPool.connect(owner).setPrice(price);

    const usdtBefore = await usdt.balanceOf(owner.address);
    const balanceBefore = await token.balanceOf(client.address);
    await usdtSwapPool.connect(client).swap(tokenAmount, client.address);
    const usdtAfter = await usdt.balanceOf(owner.address);
    const balanceAfter = await token.balanceOf(client.address);

    expect(balanceAfter.sub(balanceBefore)).to.equal(tokenAmount);
    expect(usdtAfter.sub(usdtBefore)).to.equal(usdtAmount);
  });

  it("should not swap if amount of tokens to be purchased is zero", async function () {
    const usdtAmount = ethers.utils.parseEther("100");
    const tokenAmount = ethers.utils.parseUnits("0", 18);
    const maxOutLock = ethers.utils.parseUnits("100", 18);
    const price = ethers.utils.parseUnits("2", 18);

    await usdt.connect(client).approve(usdtSwapPool.address, usdtAmount);
    await usdtSwapPool.connect(owner).setMaxOutLock(maxOutLock);
    await usdtSwapPool.connect(owner).setPrice(price);

    await expect(usdtSwapPool.connect(client).swap(tokenAmount, client.address)).to.be.revertedWith("ZERO_AMOUNT");
  });

  it("should not swap if recipient address is zero", async function () {
    const usdtAmount = ethers.utils.parseEther("100");
    const tokenAmount = ethers.utils.parseUnits("50", 18);
    const maxOutLock = ethers.utils.parseUnits("100", 18);
    const price = ethers.utils.parseUnits("2", 18);

    await usdt.connect(client).approve(usdtSwapPool.address, usdtAmount);
    await usdtSwapPool.connect(owner).setMaxOutLock(maxOutLock);
    await usdtSwapPool.connect(owner).setPrice(price);

    await expect(usdtSwapPool.connect(client).swap(tokenAmount, ethers.constants.AddressZero)).to.be.revertedWith(
      "ZERO_ADDRESS"
    );
  });

  it("should not swap if purchasable tokens is less than amount of tokens to be purchased", async function () {
    const usdtAmount = ethers.utils.parseEther("100");
    const tokenAmount = ethers.utils.parseUnits("100", 18);
    const maxOutLock = ethers.utils.parseUnits("50", 18);
    const price = ethers.utils.parseUnits("2", 18);

    await usdt.connect(client).approve(usdtSwapPool.address, usdtAmount);
    await usdtSwapPool.connect(owner).setMaxOutLock(maxOutLock);
    await usdtSwapPool.connect(owner).setPrice(price);

    await expect(usdtSwapPool.connect(client).swap(tokenAmount, client.address)).to.be.revertedWith(
      "INSUFFICIENT_AVAILABLE_PURCHASE"
    );
  });

  it("should not swap if user does not have enough USDT", async function () {
    const usdtAmount = ethers.utils.parseEther("100");
    const tokenAmount = ethers.utils.parseUnits("50", 18);
    const maxOutLock = ethers.utils.parseUnits("100", 18);
    const price = ethers.utils.parseUnits("2", 18);

    await token.connect(owner).transfer(usdtSwapPool.address, tokenAmount);
    await usdt.connect(client).approve(usdtSwapPool.address, usdtAmount);

    const USDTBalance = await usdt.balanceOf(client.address);
    await usdt.connect(client).transfer(owner.address, USDTBalance);
    await usdtSwapPool.connect(owner).setMaxOutLock(maxOutLock);
    await usdtSwapPool.connect(owner).setPrice(price);

    await expect(usdtSwapPool.connect(client).swap(tokenAmount, client.address)).to.be.revertedWith(
      "INSUFFICIENT_AVAILABLE_USDT"
    );
  });

  it("should not swap if user does not have enough approve USDT", async function () {
    const usdtAmount = ethers.utils.parseEther("50");
    const tokenAmount = ethers.utils.parseUnits("50", 18);
    const maxOutLock = ethers.utils.parseUnits("100", 18);
    const price = ethers.utils.parseUnits("2", 18);

    await token.connect(owner).transfer(usdtSwapPool.address, tokenAmount);
    await usdt.connect(client).approve(usdtSwapPool.address, usdtAmount);
    await usdtSwapPool.connect(owner).setMaxOutLock(maxOutLock);
    await usdtSwapPool.connect(owner).setPrice(price);

    await expect(usdtSwapPool.connect(client).swap(tokenAmount, client.address)).to.be.revertedWith(
      "INSUFFICIENT_APPROVE_USDT"
    );
  });

  it("should subtract tokens from reserves and transfer them to a specified address", async function () {
    const amount = ethers.utils.parseUnits("100", 18);

    await token.connect(owner).transfer(usdtSwapPool.address, amount);

    const balanceBefore = await token.balanceOf(owner.address);
    await usdtSwapPool.connect(owner).subReserve(amount, owner.address);
    const balanceAfter = await token.balanceOf(owner.address);

    expect(balanceAfter.sub(balanceBefore)).to.equal(amount);
  });

  it("should not subtract tokens from reserves if amount is zero", async function () {
    const amount = ethers.utils.parseUnits("0", 18);

    await expect(usdtSwapPool.connect(owner).subReserve(amount, owner.address)).to.be.revertedWith("ZERO_AMOUNT");
  });

  it("should not subtract tokens from reserves if contract does not have enough tokens", async function () {
    const amount = ethers.utils.parseUnits("1000", 18);

    await expect(usdtSwapPool.connect(owner).subReserve(amount, owner.address)).to.be.revertedWith(
      "INSUFFICIENT_AVAILABLE_TOKEN"
    );
  });

  it("should set new price", async function () {
    const price = ethers.utils.parseUnits("2", 18);

    await usdtSwapPool.connect(owner).setPrice(price);

    expect(await usdtSwapPool.price()).to.equal(price);
  });

  it("should set new maxOutLock", async function () {
    const maxOutLock = ethers.utils.parseUnits("100", 18);

    await usdtSwapPool.connect(owner).setMaxOutLock(maxOutLock);

    expect(await usdtSwapPool.maxOutLock()).to.equal(maxOutLock);
  });

  it("should set new owner", async function () {
    const newOwner = await ethers.Wallet.createRandom().getAddress();

    await usdtSwapPool.connect(owner).setNewOwner(newOwner);

    expect(await usdtSwapPool.owner()).to.equal(newOwner);
  });

  it("should not allow non-owner to set new owner", async function () {
    const newOwner = await ethers.Wallet.createRandom().getAddress();
    await expect(usdtSwapPool.connect(other).setNewOwner(newOwner)).to.be.revertedWith("FORBIDDEN_ONLY_OWNER");
  });

  it("should not allow non-owner to set new price", async function () {
    const price = ethers.utils.parseUnits("2", 18);
    await expect(usdtSwapPool.connect(other).setPrice(price)).to.be.revertedWith("FORBIDDEN_ONLY_OWNER");
  });

  it("should not allow non-owner to set new maxOutLock", async function () {
    const maxOutLock = ethers.utils.parseUnits("100", 18);
    await expect(usdtSwapPool.connect(other).setMaxOutLock(maxOutLock)).to.be.revertedWith("FORBIDDEN_ONLY_OWNER");
  });

  it("should not allow non-owner to subtract tokens from reserves", async function () {
    const amount = ethers.utils.parseUnits("1000", 18);
    await expect(usdtSwapPool.connect(other).subReserve(amount, other.address)).to.be.revertedWith(
      "FORBIDDEN_ONLY_OWNER"
    );
  });

  it("should not allow non-factory to initialize", async function () {
    await expect(
      usdtSwapPool.connect(other).initialize(other.address, other.address, other.address)
    ).to.be.revertedWith("FORBIDDEN");
  });
});
