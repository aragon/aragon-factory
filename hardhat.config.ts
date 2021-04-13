import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

dotenvConfig({ path: resolve(__dirname, "./.env") });

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";

// import 'hardhat-abi-exporter'
// import 'hardhat-typechain'
// import 'solidity-coverage'

const ETH_KEY = process.env.ETH_KEY;
const accounts = ETH_KEY ? ETH_KEY.split(",") : [];

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.8",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/b76cba91dc954ceebff27244923224b1",
      accounts: {
        mnemonic: ETH_KEY!,
      },
    },
  },
};

export default config;
