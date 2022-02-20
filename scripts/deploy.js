// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const { ethers } = require('hardhat')

// Deploy upgradeable contract by name
async function deployContract(contractName, ...args) {
  console.log(
    `[${contractName}]: Deploying token contract proxy, token implementation...`
  )
  const Contract = await ethers.getContractFactory(contractName)
  const contractProxy = await upgrades.deployProxy(Contract, args, {
    initializer: 'initialize'
  })
  console.log(`[${contractName}]: Deployed; Proxy address:`, contractProxy.address)

  return contractProxy
}

async function main() {
  const tokenProxy = await deployContract('CommunityPowerToken')
  await deployContract('CommunityLedger', tokenProxy.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
