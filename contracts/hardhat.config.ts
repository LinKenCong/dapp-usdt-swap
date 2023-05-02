import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { node_url, accounts } from "./utils/network";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: { version: "0.8.19" },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
  },
  networks: {
    testnet: {
      url: node_url("bsc_test"),
      // accounts: accounts("bsc_test"),
      accounts: [process.env.PRIVATE_KEY_TEST || ""],
    },
    mainnet: {
      url: node_url("bsc_main"),
      // accounts: accounts("bsc_main"),
      accounts: [process.env.PRIVATE_KEY_MAIN || ""],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: process.env.API_KEY_BSC || "",
  },
  paths: {
    sources: "src",
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "USD",
    gasPrice: 21,
  },
};

export default config;
