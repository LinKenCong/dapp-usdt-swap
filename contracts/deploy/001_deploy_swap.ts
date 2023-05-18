import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log(`deployer is ${deployer}`);

  const FakeUSDT = await deploy("ERC20Mock", {
    from: deployer,
    args: ["Fake USDT", "fUSDT"],
    log: true,
  });

  console.log(`FakeUSDT deployed to ${FakeUSDT.address}`);

  const UsdtSwapFactory = await deploy("UsdtSwapFactory", {
    from: deployer,
    args: [FakeUSDT.address],
    log: true,
  });

  console.log(`UsdtSwapFactory deployed to ${UsdtSwapFactory.address}`);
};

export default func;
