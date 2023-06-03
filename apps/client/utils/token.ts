import { utils, ethers, BigNumber } from "ethers";
import { ERC20, ERC20__factory } from "../constants/typechain-types";

const getToken = (ethersSigner: ethers.providers.JsonRpcSigner, tokenAddress: string): ERC20 => {
  const tokenFactory = new ERC20__factory(ethersSigner);
  const token = tokenFactory.attach(tokenAddress) as ERC20;
  return token;
};

export const callBalance = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  args: [tokenAddress: string, account: string]
) => {
  try {
    const token = getToken(ethersSigner, args[0]);
    const call = await token.balanceOf(args[1]);
    return call;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callName = async (ethersSigner: ethers.providers.JsonRpcSigner, args: [tokenAddress: string]) => {
  try {
    const token = getToken(ethersSigner, args[0]);
    const call = await token.name();
    return call;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callSymbol = async (ethersSigner: ethers.providers.JsonRpcSigner, args: [tokenAddress: string]) => {
  try {
    const token = getToken(ethersSigner, args[0]);
    const call = await token.symbol();
    return call;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callDecimals = async (ethersSigner: ethers.providers.JsonRpcSigner, args: [tokenAddress: string]) => {
  try {
    const token = getToken(ethersSigner, args[0]);
    const call = await token.decimals();
    return call;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callTotalSupply = async (ethersSigner: ethers.providers.JsonRpcSigner, args: [tokenAddress: string]) => {
  try {
    const token = getToken(ethersSigner, args[0]);
    const call = await token.totalSupply();
    return call;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const callAllowance = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  args: [tokenAddress: string, owner: string, spender: string]
) => {
  try {
    const token = getToken(ethersSigner, args[0]);
    const call = await token.allowance(args[1], args[2]);
    return call;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendTransfer = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  args: [tokenAddress: string, to: string, value: BigNumber]
) => {
  try {
    const token = getToken(ethersSigner, args[0]);
    const tx = await token.transfer(args[1], args[2]);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendApprove = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  args: [tokenAddress: string, spender: string, value: BigNumber]
) => {
  try {
    const token = getToken(ethersSigner, args[0]);
    const tx = await token.approve(args[1], args[2]);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error(error);
    return null;
  }
};
