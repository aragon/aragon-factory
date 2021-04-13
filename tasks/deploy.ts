import { task } from "hardhat/config";

task("deploy", "Deploys a Govern instance").setAction(async (args, HRE) => {
  const token = `0x${"00".repeat(20)}`;
  const tokenName = "G";
  const tokenSymbol = "GOV";
  const { network, ethers, deployments } = HRE;
  console.log("this is the network ", network);

  // const governContract = new ethers.ContractFactory("")
  const Factory = await ethers.getContractFactory("AragonFactory");
  const factory = await Factory.deploy();

  console.log("factory address ", factory.address);
  // const { deployments, getNamedAccounts } = HRE;
  // const { deploy } = deployments;
  // const { deployer } = await getNamedAccounts();

  // const t = await deploy("AragonFactory", {
  //   from: deployer,
  //   log: true,
  //   deterministicDeployment: true,
  // });

  // console.log(t);

  // const tx = await baseFactoryContract.newGovernWithoutConfig(
  //   name,
  //   token,
  //   tokenName || name,
  //   tokenSymbol,
  //   useProxies,
  //   {
  //     gasLimit: useProxies ? 2e6 : 9e6,
  //     gasPrice: 2e9,
  //   }
  // );

  // const { logs } = (await tx.wait()) as ethers.ContractReceipt;

  // const args = logs
  //   .filter(({ address }) => address === registryContract.address)
  //   .map((log) => registryContract.interface.parseLog(log))
  //   .find(({ name }) => name === "Registered");

  // const queueAddress = args?.args[1] as string;
  // const governAddress = args?.args[0] as string;

  // if (network.name !== "hardhat" && network.name !== "coverage") {
  //   console.log(`----\nA wild new Govern named *${name}* appeared 🦅`);
  //   console.log(format(queueAddress, "Queue", network.name));
  //   console.log(format(governAddress, "Govern", network.name));
  // }
});
