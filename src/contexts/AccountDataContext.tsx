import React, { useEffect, useCallback } from 'react'
import { BigNumber } from 'ethers'
import { useState } from 'react'
import useBlock from '../hooks/useBlock'
import { useLedgerContract, useTokenContract } from '../hooks/useContract'
import useWallet from '../hooks/useWallet'

interface IAccountData {
  tokenBalance: BigNumber
  nftBalance: number
}

const DEFAULT_VALUES = {
  tokenBalance: BigNumber.from(0),
  nftBalance: 0
}

const AccountDataContext = React.createContext<IAccountData>(DEFAULT_VALUES)

const AccountDataContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IAccountData>(DEFAULT_VALUES)

  const { account } = useWallet()
  const currentBlock = useBlock()

  const tokenContract = useTokenContract()
  const ledgerContract = useLedgerContract()

  const updateAccountData = useCallback(async () => {
    if (!account) {
      return setState(DEFAULT_VALUES)
    }

    const [tokenBalance, nftBalance] = await Promise.all<any>([
      tokenContract.balanceOf(account),
      ledgerContract.balanceOf(account)
    ])

    setState({
      tokenBalance,
      nftBalance: nftBalance.toNumber()
    })
  }, [ledgerContract, tokenContract, account])

  useEffect(() => {
    updateAccountData()
  }, [account, currentBlock, updateAccountData])

  return (
    <AccountDataContext.Provider value={{ ...state }}>
      {children}
    </AccountDataContext.Provider>
  )
}

export { AccountDataContext, AccountDataContextProvider }
