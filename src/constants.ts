import { create } from 'ipfs-http-client'

const constants = {
  tokenContractAddr: process.env.REACT_APP_TOKEN_PROXY_CONTRACT_ADDRESS || '',
  ledgerContractAddr: process.env.REACT_APP_LEDGER_PROXY_CONTRACT_ADDRESS || '',
  rpcUrl: process.env.REACT_APP_NODE,
  ipfsBaseUrl: `https://ipfs.infura.io/ipfs/`,
  ipfsClient: create({ url: process.env.REACT_APP_IPFS_URL })
}

export default constants
