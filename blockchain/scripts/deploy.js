// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const { ethers } = require("hardhat");

// Deploy upgradeable contract by name
async function deployContract(contractName, ...args) {
  const Contract = await ethers.getContractFactory(contractName);
  return upgrades.deployProxy(CommunityPowerToken, args, {
    initializer: "initialize",
  });
}

async function main() {
  console.log(
    "[Community Power Token]: Deploying token contract proxy, token implementation..."
  );
  const tokenProxy = await deployContract("CommunityPowerToken");
  console.log(
    "[Community Power Token]: Deployed; Proxy address:",
    tokenProxy.address
  );

  const ledgerContractProxy = await deployContract(
    "CommunityLedger",
    tokenProxy.address
  );
  console.log(
    "[Community Ledger Contract]: Deployed; Proxy address:",
    ledgerContractProxy.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
