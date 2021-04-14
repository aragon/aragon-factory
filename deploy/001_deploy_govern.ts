import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const factory = await deploy("AragonFactory", {
    from: deployer,
    log: true,
  });

  const AragonFactory = await ethers.getContractAt(
    factory.abi,
    factory.address
  );

  console.log("This is the AragonFactory ", AragonFactory.address);
};
export default func;
func.tags = ["AragonFactory"];
