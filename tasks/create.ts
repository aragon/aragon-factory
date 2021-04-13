import { task } from "hardhat/config";
import { getRegisterInfo } from "../utils/getRegisterInfo";

task("create", "Create DAO and register token").setAction(
  async (_, { ethers, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const GovernRegistry = await ethers.getContractAt(
      "GovernRegistry",
      "0x81292e1Db6187c9C5bfAC8acC75e9892327565c0"
    );

    console.log("GovernRegistry: ", GovernRegistry.address);
    console.log(GovernRegistry.filters);
    const registerEvent = GovernRegistry.filters.Registered();
    GovernRegistry.on(registerEvent, async (queue, govern, token) => {
      console.log("Token address ", token);
      console.log(
        "Let's wait 20 seconds just to make sure that balance is updated"
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 20000);
      });
      if (token) {
        console.log("There's token! Let's try to register");
        const register = getRegisterInfo(ethers, token, deployer);
        if (register) {
          console.log("We have index! Let's register the token");
          await register;
        }
      }
    });

    // const AragonFactory = await ethers.getContractAt(
    //   "AragonFactory",
    //   "0x4F70971D5a6f512c6ECF2185a2d367aDD554260C"
    // );
    // console.log("AragonFactory: ", AragonFactory.address);

    // const create = await AragonFactory.createDAO(
    //   "CesarDAO10",
    //   `0x${"00".repeat(20)}`,
    //   "C2",
    //   "C2",
    //   true,
    //   {
    //     gasLimit: 3e6,
    //     gasPrice: 2e9,
    //   }
    // );

    // console.log("Waiting for the tx...");
    // await create.wait();
    // console.log("Transaction confirmed!");

    const GovernBaseFactory = await ethers.getContractAt(
      "GovernBaseFactory",
      "0x84e83439A3511b6E4Cd97714577dD4D58Ad8d684"
    );

    console.log("GovernBaseFactory: ", GovernBaseFactory.address);
    const create = await GovernBaseFactory.newGovernWithoutConfig(
      "CesarDAO10",
      `0x${"00".repeat(20)}`,
      "C2",
      "C2",
      true,
      {
        gasLimit: 3e6,
        gasPrice: 2e9,
      }
    );

    console.log("Waiting for the tx...");
    await create.wait();
    console.log("Transaction confirmed!");

    await new Promise((resolve) => {
      setTimeout(resolve, 140000);
    });
  }
);
