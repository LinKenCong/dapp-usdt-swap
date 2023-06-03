import { utils, ethers, BigNumber } from "ethers";
import { UsdtSwapPool__factory, UsdtSwapPool, ERC20, ERC20__factory } from "../constants/typechain-types";
import { PoolInfo } from "../constants/type";

// Define a function to get pool information
export const getPoolInfo = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  pool: string
): Promise<PoolInfo | null> => {
  try {
    // Create a contract instance for the pool and token
    const poolFactory = new UsdtSwapPool__factory(ethersSigner);
    const usdtSwapPool = poolFactory.attach(pool) as UsdtSwapPool;
    const tokenFactory = new ERC20__factory(ethersSigner);
    const token = tokenFactory.attach(utils.getAddress(await usdtSwapPool.token())) as ERC20;
    const owner = await usdtSwapPool.owner();
    // Get pool information and return it
    const poolInfo: PoolInfo = {
      maxOutLock: await usdtSwapPool.maxOutLock(),
      price: await usdtSwapPool.price(),
      totalSwap: await usdtSwapPool.totalSwap(),
      swapAccountsCount: await usdtSwapPool.swapAccountsCount(),
      sold: await usdtSwapPool.sold(),
      owner: await usdtSwapPool.owner(),
      balance: await token.balanceOf(pool),
    };
    return poolInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define a function to format pool information
export const formatPoolInfo = (poolInfoRes: PoolInfo): PoolInfo => {
  const res: PoolInfo = {
    maxOutLock: utils.formatEther(poolInfoRes.maxOutLock),
    price: utils.formatEther(poolInfoRes.price),
    totalSwap: utils.formatEther(poolInfoRes.totalSwap),
    swapAccountsCount: poolInfoRes.swapAccountsCount.toString(),
    sold: utils.formatEther(poolInfoRes.sold),
    owner: utils.getAddress(String(poolInfoRes.owner)),
    balance: utils.formatEther(poolInfoRes.balance),
  };
  return res;
};

// Define a function to write the maxOutLock value to the contract
export const writeMaxOutLock = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  pool: `0x${string}`,
  args: [newMaxOut: string]
) => {
  try {
    // Create a contract instance for the pool
    const poolFactory = new UsdtSwapPool__factory(ethersSigner);
    const usdtSwapPool = poolFactory.attach(pool) as UsdtSwapPool;

    // Parse the newMaxOut value and write it to the contract
    const newMaxOut = utils.parseEther(args[0]);
    await usdtSwapPool.estimateGas.setMaxOutLock(newMaxOut);
    const tx = await usdtSwapPool.setMaxOutLock(newMaxOut);
    const txRes = await tx.wait();
    return txRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define a function to write the price value to the contract
export const writePrice = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  pool: `0x${string}`,
  args: [newPrice: string]
) => {
  try {
    // Create a contract instance for the pool
    const poolFactory = new UsdtSwapPool__factory(ethersSigner);
    const usdtSwapPool = poolFactory.attach(pool) as UsdtSwapPool;

    // Parse the newPrice value and write it to the contract
    const newPrice = utils.parseEther(args[0]);
    await usdtSwapPool.estimateGas.setPrice(newPrice);
    const tx = await usdtSwapPool.setPrice(newPrice);
    const txRes = await tx.wait();
    return txRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define a function to write the new owner value to the contract
export const writeNewOwner = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  pool: `0x${string}`,
  args: [newOwner: `0x${string}`]
) => {
  try {
    // Create a contract instance for the pool
    const poolFactory = new UsdtSwapPool__factory(ethersSigner);
    const usdtSwapPool = poolFactory.attach(pool) as UsdtSwapPool;

    // Write the new owner value to the contract
    await usdtSwapPool.estimateGas.setNewOwner(args[0]);
    const tx = await usdtSwapPool.setNewOwner(args[0]);
    const txRes = await tx.wait();
    return txRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define a function to subtract the reserve value from the contract
export const writeSubReserve = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  pool: `0x${string}`,
  args: [amount: string, to: `0x${string}`]
) => {
  try {
    // Create a contract instance for the pool
    const poolFactory = new UsdtSwapPool__factory(ethersSigner);
    const usdtSwapPool = poolFactory.attach(pool) as UsdtSwapPool;

    // Parse the amount value and subtract the reserve from the contract
    const amount = utils.parseEther(args[0]);
    await usdtSwapPool.estimateGas.subReserve(amount, args[1]);
    const tx = await usdtSwapPool.subReserve(amount, args[1]);
    const txRes = await tx.wait();
    return txRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};
