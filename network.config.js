require('dotenv').config()
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork: 'kovan',
  network: {
    kovan: {
      url: KOVAN_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
}
