/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const { task } = require("hardhat/config");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("hardhat-preprocessor");
require("solidity-coverage");
const fs = require("fs");

const {
  RINKEBY_API_URL,
  MAINNET_API_URL,
  POLYGON_API_URL,
  ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  CONTRACT_ADDRESS,
  ROYALTY_RECEIVER_ADDR,
} = process.env;

function getRemappings() {
  const remappings = fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("="));
  return remappings;
}

// THIS IS A PUBLICLY KNOWN (HARDHAT) PRIVATE KEY.
// DO NOT USE THIS IN PRODUCTION OR SEND ANY FUNDS TO THE ASSOCIATED ADDRESS
const BACKUP_PRIVATE_KEY = "f2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";

let PRIVATE_KEY;
if (process.env.PRIVATE_KEY) {
  PRIVATE_KEY = process.env.PRIVATE_KEY;
} else {
  console.log("Using backup private key");
  PRIVATE_KEY = BACKUP_PRIVATE_KEY;
}

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("etherscan-verify", "Verifies on etherscan", async (taskArgs, hre) => {
  console.log("Verifying contract on etherscan...");
  await hre.run("verify:verify", {
    address: CONTRACT_ADDRESS,
    constructorArguments: [ROYALTY_RECEIVER_ADDR],
  });
});

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  networks: {
    rinkeby: {
      url: RINKEBY_API_URL ?? "",
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 10000000000, // 10 gwei
    },
    mainnet: {
      url: MAINNET_API_URL ?? "",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    polygon: {
      url: POLYGON_API_URL ?? "",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
      mainnet: ETHERSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
    },
  },
  paths: {
    sources: "./src", // Use ./src rather than ./contracts as Hardhat expects
    cache: "./cache_hardhat", // Use a different cache for Hardhat than Foundry
  },
  // This fully resolves paths for imports in the ./lib directory for Hardhat
  preprocess: {
    eachLine: () => ({
      transform: (line) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              console.log("replacing", { find, replace });
              line = line.replace(find, replace);
            }
          });
        }
        return line;
      },
    }),
  },
};
