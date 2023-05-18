import { ContractMap } from "./type";

const CONTRACT_MAP_BSC: ContractMap = {
  usdt: "",
  factory: "",
};

const CONTRACT_MAP_LOCAL: ContractMap = {
  usdt: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  factory: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
};

export const CONTRACT_MAP = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? CONTRACT_MAP_LOCAL : CONTRACT_MAP_BSC;
