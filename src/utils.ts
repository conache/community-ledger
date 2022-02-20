import { ethers, providers } from 'ethers'
import constants from './constants'

export const getDefaultProvider = (): providers.Provider => {
  return ethers.providers.getDefaultProvider(constants.rpcUrl)
}

export const prettifyAccountAddress = (addr: string) => {
  return `${addr.slice(0, 6)}...${addr.slice(addr.length - 4, addr.length)}`
}

export const fullIpfsUrl = (resourcePath: string) => {
  return `${constants.ipfsBaseUrl}${resourcePath}`
}
