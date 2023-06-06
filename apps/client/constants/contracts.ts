import { ContractMap } from "./type";

const CONTRACT_MAP_BSC: ContractMap = {
  usdt: "0x55d398326f99059fF775485246999027B3197955",
  factory: "0xc4A13887E7320b94524a0aA7C747f4FCa500b7fb",
};

const CONTRACT_MAP_LOCAL: ContractMap = {
  usdt: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  factory: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
};

export const CONTRACT_MAP = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? CONTRACT_MAP_LOCAL : CONTRACT_MAP_BSC;
