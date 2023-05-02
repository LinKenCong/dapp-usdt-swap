import { HardhatRuntimeEnvironment } from "hardhat/types"; // this add the type from hardhat runtime environment
import { DeployFunction } from "hardhat-deploy/types"; // this add the type that a deploy function is expected to fullfil
import { utils } from "ethers";

import {
  CONTRACT_MAP,
  PAYEE,
  SWAP_WALLET_ADDRESS_LIST,
  SWAP_WALLET_MAXSWAP_LIST,
  SWAP_WALLET_PRICE_LIST,
} from "../constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy
  const { deploy } = deployments; // the deployments field itself contains the deploy function

  const { deployer } = await getNamedAccounts(); // we fetch the accounts. These can be configured in hardhat.config.ts as explained above

  // verify deploy params
  if (
    SWAP_WALLET_ADDRESS_LIST.length !== 6 ||
    SWAP_WALLET_MAXSWAP_LIST.length !== 6 ||
    SWAP_WALLET_PRICE_LIST.length !== 6
  ) {
    console.error("[ERROR]", "Array length wrong!");
    return;
  }

  // // deploy params ----- MAIN
  const deployParams = [
    utils.getAddress(CONTRACT_MAP.ZROs.main),
    utils.getAddress(CONTRACT_MAP.USDT.main),
    utils.getAddress(PAYEE.main),
    SWAP_WALLET_ADDRESS_LIST.map((item: string) => utils.getAddress(item)),
    SWAP_WALLET_MAXSWAP_LIST.map((item: string) => utils.parseEther(item)),
    SWAP_WALLET_PRICE_LIST.map((item: string) => utils.parseEther(item)),
  ];

  // deploy params ----- TEST
  // const deployParams = [
  //   utils.getAddress(CONTRACT_MAP.ZROs.test),
  //   utils.getAddress(CONTRACT_MAP.USDT.test),
  //   utils.getAddress(PAYEE.test),
  //   SWAP_WALLET_ADDRESS_LIST.map((item: string) => utils.getAddress(item)),
  //   SWAP_WALLET_MAXSWAP_LIST.map((item: string) => utils.parseEther(item)),
  //   SWAP_WALLET_PRICE_LIST.map((item: string) => utils.parseEther(item)),
  // ];

  console.log({ deployParams });

  // deploy
  await deploy("SwapToken", {
    // this will create a deployment called 'Token'. By default it will look for an artifact with the same name. the contract option allows you to use a different artifact
    from: deployer, // deployer will be performing the deployment transaction
    args: deployParams, // tokenOwner is the address used as the first argument to the Token contract's constructor
    log: true, // display the address and gas used in the console (not when run in test though)
  });
};
export default func;
func.tags = ["ZERONESwap"]; // this setup a tag so you can execute the script on its own (and its dependencies)
