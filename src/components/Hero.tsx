import React from 'react'
import useAccountData from '../hooks/useAccountData'
import usePlarformData from '../hooks/usePlatformData'
import useWallet from '../hooks/useWallet'
import ConnectPreview from './ConnectPreview'
import MintedBrickDetails from './MintedBrickDetails'
import MintForm from './MintForm'

const Hero = () => {
  const { account } = useWallet()
  const { mintEnabled } = usePlarformData()
  const { nftBalance } = useAccountData()

  if (!mintEnabled) {
    return <div>Mint not enabled yet - talk to you soon</div>
  }

  if (!account) {
    return <ConnectPreview />
  }

  return nftBalance > 0 ? <MintedBrickDetails /> : <MintForm />
}

export default Hero
