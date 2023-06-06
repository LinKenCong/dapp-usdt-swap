import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

let USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log(`deployer is ${deployer}`);

  const Token = await deploy("ERC20Mock", {
    from: deployer,
    args: ["USDT Swap Token", "UST"],
    log: true,
  });

  console.log(`Token deployed to ${Token.address}`);

  if (!USDT_ADDRESS) {
    const FakeUSDT = await deploy("ERC20Mock", {
      from: deployer,
      args: ["Fake USDT", "fUSDT"],
      log: true,
    });
    USDT_ADDRESS = FakeUSDT.address;
    console.log(`FakeUSDT deployed to ${USDT_ADDRESS}`);
  }

  const UsdtSwapFactory = await deploy("UsdtSwapFactory", {
    from: deployer,
    args: [USDT_ADDRESS],
    log: true,
  });

  console.log(`UsdtSwapFactory deployed to ${UsdtSwapFactory.address}`);
};

export default func;
