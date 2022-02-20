import React from 'react'
import useAccountData from '../hooks/useAccountData'
import usePlarformData from '../hooks/usePlatformData'
import useWallet from '../hooks/useWallet'
import ConnectPreview from './ConnectPreview'
import LoadingText from './LoadingText'
import MintedBrickDetails from './MintedBrickDetails'
import MintForm from './MintForm'
import MintNotEnabled from './MintNotEnabled'

const Hero = () => {
  const { account } = useWallet()
  const { loading, mintEnabled } = usePlarformData()
  const { nftBalance } = useAccountData()

  if (loading) {
    return <LoadingText />
  }

  if (!mintEnabled) {
    return <MintNotEnabled />
  }

  if (!account) {
    return <ConnectPreview />
  }

  return (
    <div className="mt-10">{nftBalance > 0 ? <MintedBrickDetails /> : <MintForm />}</div>
  )
}

export default Hero
