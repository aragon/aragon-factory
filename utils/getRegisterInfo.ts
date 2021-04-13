import { CensusErc20Api } from "dvote-js";
import { BigNumber } from "ethers";

export const getRegisterInfo = async (
  ethers: any,
  tokenAddress: string,
  deployer: any
) => {
  const ERC20Contract = await ethers.getContractAt("ERC20", tokenAddress);
  const blockNumber = await ethers.provider.getBlockNumber();
  const balance = await ERC20Contract.balanceOf(deployer);

  console.log("Balance: ", balance.toString());
  console.log("Block number: ", blockNumber);

  let results = {
    blockHeaderRLP: "",
    accountProofRLP: "",
    storageProofsRLP: "",
  };

  let indexSlot;
  console.log("Let's look for the balance mapping slot ");
  for (let i = 0; i < 50; i++) {
    const balanceSlot = CensusErc20Api.getHolderBalanceSlot(deployer, i);
    try {
      const result = await CensusErc20Api.generateProof(
        tokenAddress,
        [balanceSlot],
        blockNumber,
        ethers.provider,
        { verify: true }
      );

      if (result == null || !result.proof) continue;
      results = result as any;
      const onChainBalance = BigNumber.from(result.proof.storageProof[0].value);

      console.log("A proof in index: ", i);
      if (!onChainBalance.eq(balance)) {
        console.warn(
          "The proved balance does not match the on-chain balance:",
          result.proof.storageProof[0].value,
          "vs",
          balance.toHexString()
        );
      }

      indexSlot = i;
      return;
    } catch (e) {
      console.log("Result not found on index ", i);
    }
  }

  if (indexSlot) {
    console.log("Balance mapping slot is: ", indexSlot);
    const TokenStorageProof = await ethers.getContractAt(
      "TokenStorageProof",
      "0xf215116795EE6add4789a8E891CAEB26A623221d"
    );

    return TokenStorageProof.registerToken(
      tokenAddress,
      indexSlot,
      blockNumber,
      Buffer.from(results.blockHeaderRLP.replace("0x", ""), "hex"),
      Buffer.from(results.accountProofRLP.replace("0x", ""), "hex"),
      Buffer.from(results.storageProofsRLP[0].replace("0x", ""), "hex")
    );
  }
};
