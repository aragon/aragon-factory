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

  const t = await AragonFactory.createDAO(
    "CesarDAO",
    `0x${"00".repeat(20)}`,
    "C",
    "C",
    true,
    {
      gasLimit: 3e6,
      gasPrice: 2e9,
    }
  );

  console.log("This is the transaction ", t.hash);
  // const filter = GovernBaseFactory.filters.DaoCreated();

  // console.log("this is the filter ", filter);
  await t.wait();

  console.log("Confirmed...");
};
export default func;
func.tags = ["AragonFactory"];
