import { utils, ethers, BigNumber } from "ethers";
import { UsdtSwapFactory__factory, UsdtSwapFactory } from "../constants/typechain-types";
import { CONTRACT_MAP } from "../constants/contracts";

// Get the address of the factory contract
const FACTORY = utils.getAddress(CONTRACT_MAP.factory);

// Define a function that returns the address of a pool given an owner and token address
export const getPoolAddress = async (
  ethersSigner: ethers.providers.JsonRpcSigner,
  args: [owner: `0x${string}`, token: `0x${string}`]
): Promise<string | null> => {
  try {
    const factory = new UsdtSwapFactory__factory(ethersSigner);
    const usdtSwapFactory = factory.attach(FACTORY) as UsdtSwapFactory;
    const poolAddress = await usdtSwapFactory.getPool(args[0], args[1]);
    return poolAddress !== ethers.constants.AddressZero ? poolAddress : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
