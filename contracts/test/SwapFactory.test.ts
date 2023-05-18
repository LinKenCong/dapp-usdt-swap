import { expect } from "chai";
import { ethers } from "hardhat";
import {
  UsdtSwapFactory,
  UsdtSwapFactory__factory,
  UsdtSwapPool,
  UsdtSwapPool__factory,
  ERC20Mock,
  ERC20Mock__factory,
} from "../typechain-types";

describe("UsdtSwapFactory", () => {
  let factory: UsdtSwapFactory;
  let usdt: ERC20Mock;
  let token: ERC20Mock;
  let pool: UsdtSwapPool;

  beforeEach(async () => {
    const [deployer, alice] = await ethers.getSigners();

    // 部署 usdt % token 合约
    const tokenFactory = new ERC20Mock__factory(deployer);
    usdt = await tokenFactory.deploy("USDT", "USDT");
    token = await tokenFactory.connect(alice).deploy("Token", "Token");

    // 部署 UsdtSwapFactory 合约
    const factoryFactory = new UsdtSwapFactory__factory(deployer);
    factory = await factoryFactory.deploy(usdt.address);
  });

  it("should create a new pool", async () => {
    const [deployer, alice] = await ethers.getSigners();

    // 断言 UsdtSwapPool 合约地址为空
    expect(await factory.getPool(alice.address, token.address)).to.equal(ethers.constants.AddressZero);

    // 创建新的 UsdtSwapPool 合约
    const tx = await factory.connect(alice).createPool(token.address);
    const receipt = await tx.wait();

    // 获取创建的 UsdtSwapPool 合约地址
    const poolAddress = receipt.events?.find((event) => event.event === "PoolCreated")?.args?.pool;

    // 断言 UsdtSwapPool 合约地址不为空
    expect(poolAddress).to.not.be.undefined;

    // 尝试创建重复的 UsdtSwapPool 合约
    await expect(factory.connect(alice).createPool(token.address)).to.be.rejectedWith("POOL_EXISTS");

    // 断言 UsdtSwapPool 合约地址已经存储到 UsdtSwapFactory 合约中
    const storedPoolAddress = await factory.getPool(alice.address, token.address);
    expect(storedPoolAddress).to.equal(poolAddress);

    // 断言 UsdtSwapPool 合约已经存储到 allPools 数组中
    const allPoolsLength = await factory.allPoolsLength();
    expect(allPoolsLength).to.equal(1);
    const allPools = await Promise.all(
      Array.from({ length: allPoolsLength.toNumber() }, (_, i) => factory.allPools(i))
    );
    expect(allPools).to.deep.equal([poolAddress]);
  });

  it("should get the pool", async () => {
    const [deployer, alice] = await ethers.getSigners();

    // 创建新的 UsdtSwapPool 合约
    const tx = await factory.connect(alice).createPool(token.address);
    const receipt = await tx.wait();

    // 获取创建的 UsdtSwapPool 合约地址
    const poolAddress = receipt.events?.find((event) => event.event === "PoolCreated")?.args?.pool;

    const poolFactory = new UsdtSwapPool__factory(deployer);
    pool = poolFactory.attach(poolAddress) as UsdtSwapPool;

    // 调用 UsdtSwapPool getReserves()合约的函数
    const reserves = await pool.getReserves();

    expect(reserves._reserve).to.equal(0);
    expect(reserves._sold).to.equal(0);
  });
});
