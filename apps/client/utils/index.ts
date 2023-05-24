import { utils, ethers, BigNumber } from "ethers";
import {
  UsdtSwapPool__factory,
  UsdtSwapPool,
  UsdtSwapFactory__factory,
  UsdtSwapFactory,
} from "../constants/typechain-types";
import { CONTRACT_MAP } from "../constants/contracts";
import { PoolInfo } from "../constants/type";

const FACTORY = utils.getAddress(CONTRACT_MAP.factory);

export const getPoolAddress = async (
  ethersSigner: ethers.providers.JsonRpcSigner | null,
  args: [owner: `0x${string}`, token: `0x${string}`]
): Promise<string | null> => {
  if (!ethersSigner || !utils.isAddress(FACTORY)) {
    return null;
  }
  const factory = new UsdtSwapFactory__factory(ethersSigner);
  const usdtSwapFactory = factory.attach(FACTORY) as UsdtSwapFactory;
  const poolAddress = await usdtSwapFactory.getPool(args[0], args[1]);
  return poolAddress !== ethers.constants.AddressZero ? poolAddress : null;
};

export const getPoolInfo = async (
  ethersSigner: ethers.providers.JsonRpcSigner | null,
  pool: string | undefined
): Promise<PoolInfo | null> => {
  if (!pool || !ethersSigner) {
    return null;
  }
  const poolFactory = new UsdtSwapPool__factory(ethersSigner);
  const usdtSwapPool = poolFactory.attach(pool) as UsdtSwapPool;
  const poolInfo: PoolInfo = {
    maxOutLock: await usdtSwapPool.maxOutLock(),
    price: await usdtSwapPool.price(),
    totalSwap: await usdtSwapPool.totalSwap(),
    swapAccountsCount: await usdtSwapPool.swapAccountsCount(),
    sold: await usdtSwapPool.sold(),
  };
  return poolInfo;
};
