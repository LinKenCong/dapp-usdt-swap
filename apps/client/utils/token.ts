import { utils, ethers, BigNumber } from "ethers";
import { callContract, getToken } from "./contract";

export const callBalance = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  tokenAddress: string,
  args: [account: string]
) => {
  const token = getToken(ethersSigner, tokenAddress);
  return await token.balanceOf(args[0]);
};

export const callName = async (ethersSigner: ethers.providers.JsonRpcSigner, tokenAddress: string) => {
  const token = getToken(ethersSigner, tokenAddress);
  return await token.name();
};

export const callSymbol = async (ethersSigner: ethers.providers.JsonRpcSigner, tokenAddress: string) => {
  const token = getToken(ethersSigner, tokenAddress);
  return await token.symbol();
};

export const callDecimals = async (ethersSigner: ethers.providers.JsonRpcSigner, tokenAddress: string) => {
  const token = getToken(ethersSigner, tokenAddress);
  return await token.decimals();
};

export const callTotalSupply = async (ethersSigner: ethers.providers.JsonRpcSigner, tokenAddress: string) => {
  const token = getToken(ethersSigner, tokenAddress);
  return await token.totalSupply();
};

export const callAllowance = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  tokenAddress: string,
  args: [owner: string, spender: string]
) => {
  const token = getToken(ethersSigner, tokenAddress);
  return await token.allowance(args[0], args[1]);
};

export const sendTransfer = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  tokenAddress: string,
  args: [to: string, value: BigNumber]
) => {
  try {
    const token = getToken(ethersSigner, tokenAddress);
    const tx = await token.transfer(args[0], args[1]);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendApprove = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  tokenAddress: string,
  args: [spender: string, value: BigNumber]
) => {
  try {
    const token = getToken(ethersSigner, tokenAddress);
    const tx = await token.approve(args[0], args[1]);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error(error);
    return null;
  }
};
