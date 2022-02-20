import React, { useState, useCallback, useEffect } from 'react'
import { BigNumber } from 'ethers'
import { useLedgerContract, useTokenContract } from '../hooks/useContract'
import useBlock from '../hooks/useBlock'

interface IPlarformData {
  tokenName?: string | null
  tokenSymbol?: string | null
  mintPrice: BigNumber
  mintEnabled: boolean
  mintedBricksCount: number
}

const PlatformDataContext = React.createContext<IPlarformData>({
  tokenName: null,
  tokenSymbol: null,
  mintPrice: BigNumber.from(0),
  mintEnabled: false,
  mintedBricksCount: 0
})

const PlatformDataContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IPlarformData>({
    tokenName: null,
    tokenSymbol: null,
    mintPrice: BigNumber.from(0),
    mintEnabled: false,
    mintedBricksCount: 0
  })

  const currentBlock = useBlock()
  const tokenContract = useTokenContract()
  const ledgerContract = useLedgerContract()

  const updateData = useCallback(async () => {
    const [tokenName, tokenSymbol, mintPrice, mintEnabled, mintedBricksCount] =
      await Promise.all<any>([
        tokenContract.name(),
        tokenContract.symbol(),
        ledgerContract.mintPrice(),
        ledgerContract.mintEnabled(),
        ledgerContract.mintedBricksCount()
      ])

    setState({
      tokenName,
      tokenSymbol,
      mintPrice,
      mintEnabled,
      mintedBricksCount: mintedBricksCount.toNumber()
    })
  }, [ledgerContract, tokenContract])

  useEffect(() => {
    updateData()
  }, [currentBlock, updateData])

  return (
    <PlatformDataContext.Provider value={{ ...state }}>
      {children}
    </PlatformDataContext.Provider>
  )
}

export { PlatformDataContext, PlatformDataContextProvider }
