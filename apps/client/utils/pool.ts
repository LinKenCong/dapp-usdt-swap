import { utils, ethers, BigNumber } from "ethers";
import { PoolInfo } from "../constants/type";
import { getPool } from "./contract";
import { callBalance } from "./token";

export const callPoolPurchasable = async (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.purchasableTokens();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolMaxOutLock = async (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.maxOutLock();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolPrice = async (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.price();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolSwapAccountsCount = async (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.swapAccountsCount();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolSold = async (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.sold();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolOwner = async (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.owner();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolToken = async (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.token();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolFactory = async (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.factory();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolUsdt = async (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.usdt();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolSwapCountOf = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  poolAddress: string,
  args: [account: string]
) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.swapCountOf(args[0]);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callPoolGetUsdtIn = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  poolAddress: string,
  args: [tokenOut: BigNumber]
) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    return await pool.getUsdtIn(args[0]);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define a function to get pool information
export const getPoolInfo = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  poolAddress: string
): Promise<PoolInfo | null> => {
  try {
    const poolToken = await callPoolToken(ethersSigner, poolAddress);
    const poolInfo: PoolInfo = {
      maxOutLock: (await callPoolMaxOutLock(ethersSigner, poolAddress)) || "",
      price: (await callPoolPrice(ethersSigner, poolAddress)) || "",
      swapAccountsCount: (await callPoolSwapAccountsCount(ethersSigner, poolAddress)) || "",
      sold: (await callPoolSold(ethersSigner, poolAddress)) || "",
      owner: String(await callPoolOwner(ethersSigner, poolAddress)) || "",
      token: poolToken || "",
      balance: (await callBalance(ethersSigner, String(poolToken), [poolAddress])) || "",
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
    swapAccountsCount: poolInfoRes.swapAccountsCount.toString(),
    sold: utils.formatEther(poolInfoRes.sold),
    owner: utils.getAddress(String(poolInfoRes.owner)),
    token: utils.getAddress(String(poolInfoRes.token)),
    balance: utils.formatEther(poolInfoRes.balance),
  };
  return res;
};

// Define a function to write the maxOutLock value to the contract
export const sendPoolMaxOutLock = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  poolAddress: string,
  args: [newMaxOut: BigNumber]
) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    await pool.estimateGas.setMaxOutLock(args[0]);
    const tx = await pool.setMaxOutLock(args[0]);
    const txRes = await tx.wait();
    return txRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define a function to write the price value to the contract
export const sendPoolPrice = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  poolAddress: string,
  args: [newPrice: BigNumber]
) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    await pool.estimateGas.setPrice(args[0]);
    const tx = await pool.setPrice(args[0]);
    const txRes = await tx.wait();
    return txRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define a function to write the new owner value to the contract
export const sendPoolNewOwner = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  poolAddress: string,
  args: [newOwner: string]
) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    await pool.estimateGas.setNewOwner(args[0]);
    const tx = await pool.setNewOwner(args[0]);
    const txRes = await tx.wait();
    return txRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define a function to subtract the reserve value from the contract
export const sendPoolSubReserve = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  poolAddress: string,
  args: [amount: BigNumber, to: string]
) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    await pool.estimateGas.subReserve(args[0], args[1]);
    const tx = await pool.subReserve(args[0], args[1]);
    const txRes = await tx.wait();
    return txRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendPoolSwap = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  poolAddress: string,
  args: [tokenOut: BigNumber, to: string]
) => {
  try {
    const pool = getPool(ethersSigner, poolAddress);
    await pool.estimateGas.swap(args[0], args[1]);
    const tx = await pool.swap(args[0], args[1]);
    const txRes = await tx.wait();
    return txRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};
