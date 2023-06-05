import { utils, ethers, BigNumber } from "ethers";
import { CONTRACT_MAP } from "../constants/contracts";
import { getPoolFactory } from "./contract";

// Get the address of the factory contract
const FACTORY = utils.getAddress(CONTRACT_MAP.factory);

// Define a function that returns the address of a pool given an owner and token address
export const callFactoryGetPool = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  args: [owner: string, token: string]
) => {
  const factory = getPoolFactory(ethersSigner, FACTORY);
  const poolAddress = await factory.getPool(args[0], args[1]);
  return poolAddress !== ethers.constants.AddressZero ? poolAddress : undefined;
};
