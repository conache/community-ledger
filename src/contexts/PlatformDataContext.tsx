import React, { useState, useCallback, useEffect } from 'react'
import { BigNumber } from 'ethers'
import { useLedgerContract, useTokenContract } from '../hooks/useContract'
import useBlockRefresher from '../hooks/useBlockRefresher'

interface IPlarformData {
  loading: boolean
  tokenName?: string | null
  tokenSymbol?: string | null
  mintPrice: BigNumber
  mintEnabled: boolean
  mintedBricksCount: number
  raisedTokens: BigNumber
}

const DEFAULT_VALUES = {
  loading: true,
  tokenName: null,
  tokenSymbol: null,
  mintPrice: BigNumber.from(0),
  mintEnabled: false,
  mintedBricksCount: 0,
  raisedTokens: BigNumber.from(0)
}

const PlatformDataContext = React.createContext<IPlarformData>(DEFAULT_VALUES)

const PlatformDataContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IPlarformData>(DEFAULT_VALUES)

  const { blockNumber, refreshCount } = useBlockRefresher()
  const tokenContract = useTokenContract()
  const ledgerContract = useLedgerContract()

  const updateData = useCallback(async () => {
    const [
      tokenName,
      tokenSymbol,
      mintPrice,
      mintEnabled,
      mintedBricksCount,
      raisedTokens
    ] = await Promise.all<any>([
      tokenContract.name(),
      tokenContract.symbol(),
      ledgerContract.mintPrice(),
      ledgerContract.mintEnabled(),
      ledgerContract.mintedBricksCount(),
      tokenContract.balanceOf(ledgerContract.address)
    ])

    setState({
      loading: false,
      tokenName,
      tokenSymbol,
      mintPrice,
      mintEnabled,
      mintedBricksCount: mintedBricksCount.toNumber(),
      raisedTokens
    })
  }, [ledgerContract, tokenContract])

  useEffect(() => {
    updateData()
  }, [updateData, blockNumber, refreshCount])

  return (
    <PlatformDataContext.Provider value={{ ...state }}>
      {children}
    </PlatformDataContext.Provider>
  )
}

export { PlatformDataContext, PlatformDataContextProvider }
