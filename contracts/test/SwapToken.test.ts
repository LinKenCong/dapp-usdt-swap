import { expect } from "chai";
import { ethers, deployments, getNamedAccounts } from "hardhat";

describe("Token contract", function () {
  it("swap", async () => {
    // accounts
    const accounts = await ethers.getSigners();
    const walletSigner = accounts.slice(1, 7);
    const swapWallets = walletSigner.map((item: any) => item.address);
    expect(swapWallets.length).to.equal(6);
    // deploy
    const TokenFactory = await ethers.getContractFactory("TestToken");
    const token = await TokenFactory.deploy();
    const usdt = await TokenFactory.deploy();
    const SwapTokenFactory = await ethers.getContractFactory("SwapToken");
    const swapToken = await SwapTokenFactory.deploy(token.address, usdt.address);
    // give swapWallets balance
    const maxSwapList = [5000000, 10000000, 10000000, 10000000, 10000000, 10000000];
    const maxSwapEthList = maxSwapList.map((item: any) => ethers.utils.parseEther(String(item)));
    expect(maxSwapEthList.length).to.equal(6);
    {
      // transfer token to wallet
      for (let i = 0; i < swapWallets.length; i++) {
        await token.transfer(swapWallets[i], maxSwapEthList[i]);
      }
    }
    {
      // check wallet balance
      for (let i = 0; i < swapWallets.length; i++) {
        const balance = await token.balanceOf(swapWallets[i]);
        expect(balance).to.equal(maxSwapEthList[i]);
      }
    }
    // wallet approve token to swapToken contract
    {
      for (let i = 0; i < swapWallets.length; i++) {
        await token.connect(walletSigner[i]).approve(swapToken.address, maxSwapEthList[i]);
      }
    }
    {
      // check wallet approve
      for (let i = 0; i < swapWallets.length; i++) {
        const allowance = await token.allowance(swapWallets[i], swapToken.address);
        expect(allowance).to.equal(maxSwapEthList[i]);
      }
    }
    // get token price
    const priceList = [0.006, 0.007, 0.008, 0.009, 0.1, 0.11];
    const priceEthList = priceList.map((item: any) => ethers.utils.parseEther(String(item)));
    expect(priceEthList.length).to.equal(6);

    {
      // swapToken initWallet
      await swapToken.initWallet(swapWallets, maxSwapEthList, priceEthList);
      {
        // check wallet info
        for (let i = 0; i < swapWallets.length; i++) {
          const walletInfo = await swapToken.wallets(i);
          expect(walletInfo["account"]).to.equal(swapWallets[i]);
          expect(walletInfo["maxSwap"]).to.equal(maxSwapEthList[i]);
          expect(walletInfo["price"]).to.equal(priceEthList[i]);
        }
      }
      // if change wallet agian should be error
      await expect(swapToken.initWallet(swapWallets, maxSwapEthList, priceEthList)).to.be.revertedWith(
        "Wallet initialized."
      );
    }
    // user swap
    const testUser = accounts[8];
    {
      const testAmount = maxSwapList[0] * priceList[0];
      const testEth = ethers.utils.parseEther(String(testAmount));
      await usdt.transfer(testUser.address, testEth);
      await usdt.connect(testUser).approve(swapToken.address, testEth);
      await swapToken.connect(testUser).swap(testEth);
      const tokenbalance = await token.balanceOf(testUser.address);
      const nowIndex = await swapToken.walletIndex();
      expect(String(nowIndex)).to.equal("0");
      const walletSwapCount = await swapToken.swapToken(nowIndex);
      const walletAccountSwapCount = await swapToken.getWalletSwapOf(nowIndex, testUser.address);
      expect(tokenbalance).to.equal(ethers.utils.parseEther(String(maxSwapList[0])));
      expect(walletSwapCount).to.equal(tokenbalance);
      expect(walletAccountSwapCount).to.equal(tokenbalance);
    }
    // next wallet
    {
      const testAmount = maxSwapList[1] * priceList[1];
      // const testAmount = 1;
      console.log(testAmount);
      const testEth = ethers.utils.parseEther(String(testAmount));
      const nowIndex1 = await swapToken.walletIndex();
      console.log(
        "getTokenOut",
        ethers.utils.formatEther(await swapToken.purchasableTokens(nowIndex1)),
        ethers.utils.formatEther(await swapToken.getTokenOut(1, testEth))
      );
      await usdt.transfer(testUser.address, testEth);
      await usdt.connect(testUser).approve(swapToken.address, testEth);
      await swapToken.connect(testUser).swap(testEth);
      const nowIndex = await swapToken.walletIndex();
      expect(String(nowIndex)).to.equal("1");
      console.log("purchasableTokens", ethers.utils.formatEther(await swapToken.purchasableTokens(nowIndex)));
    }
  });
});
