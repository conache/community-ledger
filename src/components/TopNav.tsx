import React from 'react'
import useWallet from '../hooks/useWallet'
import { prettifyAccountAddress } from '../utils'
import Logo from './Logo'

const TopNav = () => {
  const { account } = useWallet()

  return (
    <div className="w-full flex justify-between py-4 px-6 items-center">
      <Logo />
      {account && (
        <div className="bg-blue p-2 rounded font-bold">
          {prettifyAccountAddress(account)}
        </div>
      )}
    </div>
  )
}

export default TopNav
