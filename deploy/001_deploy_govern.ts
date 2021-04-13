import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const factory = await deploy("AragonFactory", {
    from: deployer,
    log: true,
    gasLimit: 2000000
  });

  const AragonFactory = await ethers.getContractAt(
    factory.abi,
    factory.address
  );


  const t = await AragonFactory.createDAO(`0x${"00".repeat(20)}`);
  await t.wait();
  console.log(t);
};
export default func;
func.tags = ["AragonFactory"];
