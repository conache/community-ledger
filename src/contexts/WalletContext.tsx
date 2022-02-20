import React, { useEffect, useReducer } from 'react'
import { ethers, providers } from 'ethers'
import { getDefaultProvider } from '../utils'
import { Signer } from 'ethers'

interface IWalletContext {
  provider: providers.Provider
  signer: providers.Provider | Signer
  providerExtensionInstalled: boolean
  account?: string | null
  connectWallet: any
}

type IWalletContextProviderState = Omit<IWalletContext, 'connectWallet'>

const WalletContext = React.createContext<IWalletContext>({
  provider: getDefaultProvider(),
  providerExtensionInstalled: !!window.ethereum,
  account: null,
  connectWallet: null,
  signer: getDefaultProvider()
})

const WalletContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useReducer(
    (
      prevState: IWalletContextProviderState,
      newState: Partial<IWalletContextProviderState>
    ) => ({ ...prevState, ...newState }),
    {
      provider: getDefaultProvider(),
      providerExtensionInstalled: !!window.ethereum,
      account: null,
      signer: getDefaultProvider()
    }
  )

  useEffect(() => {
    const accountChangeHandler = (accounts?: string[]) =>
      handleAccountChange(accounts?.[0])
    window.ethereum.on('accountsChanged', accountChangeHandler)

    return () => window.ethereum.removeListener('accountsChanged', accountChangeHandler)
  })

  const handleAccountChange = (newAccountAddr?: string) => {
    if (!newAccountAddr) {
      // disconnected
      setState({
        account: null,
        provider: getDefaultProvider(),
        signer: getDefaultProvider()
      })
      return
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setState({
      account: newAccountAddr.toLowerCase(),
      provider,
      signer: provider.getSigner()
    })
  }

  const connectWallet = async () => {
    if (!state.providerExtensionInstalled) {
      return
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    await handleAccountChange(accounts[0])
  }

  return (
    <WalletContext.Provider value={{ ...state, connectWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

export { WalletContext, WalletContextProvider }
