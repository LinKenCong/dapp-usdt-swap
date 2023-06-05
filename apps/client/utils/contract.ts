import { utils, ethers, BigNumber, BigNumberish } from "ethers";
import {
  UsdtSwapPool__factory,
  UsdtSwapPool,
  ERC20,
  ERC20__factory,
  UsdtSwapFactory__factory,
  UsdtSwapFactory,
} from "../constants/typechain-types";

export const callContract = async (
  provider: ethers.providers.Provider,
  contractInterface: ethers.ContractInterface,
  contractAddress: string,
  functionName: string,
  args: any[]
) => {
  const contract = new ethers.Contract(contractAddress, contractInterface, provider);
  const contractFunction = contract.functions[functionName].call([...args]);
  const res: BigNumberish = await contractFunction;
  return res;
};

export const getToken = (ethersSigner: ethers.providers.JsonRpcSigner, tokenAddress: string): ERC20 => {
  const tokenFactory = new ERC20__factory(ethersSigner);
  const token = tokenFactory.attach(tokenAddress) as ERC20;
  return token;
};

export const getPool = (ethersSigner: ethers.providers.JsonRpcSigner, poolAddress: string): UsdtSwapPool => {
  const poolFactory = new UsdtSwapPool__factory(ethersSigner);
  const usdtSwapPool = poolFactory.attach(poolAddress) as UsdtSwapPool;
  return usdtSwapPool;
};

export const getPoolFactory = (
  ethersSigner: ethers.providers.JsonRpcSigner,
  factoryAddress: string
): UsdtSwapFactory => {
  const factory = new UsdtSwapFactory__factory(ethersSigner);
  const usdtSwapFactory = factory.attach(factoryAddress) as UsdtSwapFactory;
  return usdtSwapFactory;
};
