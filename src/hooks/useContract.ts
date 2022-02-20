import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import useWallet from './useWallet'
import constants from '../constants'
import TokenContract from '../artifacts/contracts/CommunityPowerToken.sol/CommunityPowerToken.json'
import LedgerContract from '../artifacts/contracts/CommunityLedger.sol/CommunityLedger.json'

const useContract = (address: string, abi: ethers.ContractInterface) => {
  const { signer } = useWallet()
  const [contract, setContract] = useState(new ethers.Contract(address, abi, signer))

  useEffect(() => {
    setContract(new ethers.Contract(address, abi, signer))
  }, [abi, address, signer])

  return contract
}

export const useLedgerContract = () =>
  useContract(constants.ledgerContractAddr, LedgerContract.abi)

export const useTokenContract = () =>
  useContract(constants.tokenContractAddr, TokenContract.abi)
