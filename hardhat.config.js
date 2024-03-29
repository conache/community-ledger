require('dotenv').config()
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')
require('@openzeppelin/hardhat-upgrades')
require('@nomiclabs/hardhat-etherscan')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY

module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './src/artifacts'
  },
  defaultNetwork: 'rinkeby',
  networks: {
    kovan: {
      url: process.env.KOVAN_RPC_URL,
      accounts: [DEPLOYER_PRIVATE_KEY]
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [DEPLOYER_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}
