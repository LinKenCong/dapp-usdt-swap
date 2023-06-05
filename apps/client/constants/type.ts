import { BigNumber, BigNumberish } from "ethers";

export type PageConfig = {
  title: string;
  description: string;
};

export type ContentConfig = {
  title: string;
  back: string;
};

export type NavListItem = {
  text: string;
  page: string;
};

export type ContractMap = {
  usdt: string;
  factory: string;
};

export interface PoolInfo {
  maxOutLock: BigNumberish;
  price: BigNumberish;
  swapAccountsCount: BigNumberish;
  sold: BigNumberish;
  owner: String;
  token: String;
  balance: BigNumberish;
}
