import { task } from "hardhat/config";
import { CensusErc20Api } from "dvote-js";
import { BigNumber } from "ethers";

task("register", "Deploys a Govern instance").setAction(
  async (_, { ethers }) => {
    // Get balance mapping
    // const discoveredPool = await GatewayPool.discover({
    //   bootnodesContentUri: "https://bootnodes.vocdoni.net/gateways.dev.json",
    //   networkId: "rinkeby",
    //   environment: "dev",
    // });

    // const pool = await discoveredPool.init();

    const TOKEN_ADDRESS = "0x8255E1FaF4d977708f622DbA724c62ee2C0aB0FC";
    const DEPLOYER = "0x52aE008DEC5B90f7D12aE1d8646A9cC070992919";

    const ERC20Contract = await ethers.getContractAt("ERC20", TOKEN_ADDRESS);
    const blockNumber = await ethers.provider.getBlockNumber();
    const balance = await ERC20Contract.balanceOf(DEPLOYER);

    console.log(
      "Balance: ",
      BigNumber.from(Number(balance.toString()) / 1e18).toHexString()
    );
    console.log("Block number: ", blockNumber);

    let results = {
      blockHeaderRLP: "",
      accountProofRLP: "",
      storageProofsRLP: "",
    };
    for (let i = 0; i < 10; i++) {
      const balanceSlot = CensusErc20Api.getHolderBalanceSlot(DEPLOYER, i);
      try {
        const result = await CensusErc20Api.generateProof(
          TOKEN_ADDRESS,
          [balanceSlot],
          blockNumber,
          ethers.provider,
          { verify: true }
        );

        if (result == null || !result.proof) continue;
        results = result as any;
        const onChainBalance = BigNumber.from(
          result.proof.storageProof[0].value
        );

        console.log("A proof in index: ", i);
        if (!onChainBalance.eq(balance)) {
          console.warn(
            "The proved balance does not match the on-chain balance:",
            result.proof.storageProof[0].value,
            "vs",
            balance.toHexString()
          );
          continue;
        }

        console.log("we found it? ", i);
        return i;
      } catch (e) {
        console.log("error here bruh");
      }
    }

    const TokenStorageProof = await ethers.getContractAt(
      "TokenStorageProof",
      "0xf215116795EE6add4789a8E891CAEB26A623221d"
    );

    const register = await TokenStorageProof.registerToken(
      TOKEN_ADDRESS,
      8,
      blockNumber,
      Buffer.from(results.blockHeaderRLP.replace("0x", ""), "hex"),
      Buffer.from(results.accountProofRLP.replace("0x", ""), "hex"),
      Buffer.from(results.storageProofsRLP[0].replace("0x", ""), "hex")
    );

    await register.wait();
    console.log(register);

    // const GovernBaseFactory = await ethers.getContractAt(
    //   "GovernBaseFactory",
    //   "0xe071fc0c53be275cf7246d16373a74231fa5a585"
    // );
  }
);
