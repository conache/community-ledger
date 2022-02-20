import React, { useState, useEffect, useCallback } from 'react'
import { useLedgerContract } from '../hooks/useContract'
import useWallet from '../hooks/useWallet'
import BrickItem, { IBrickItemData } from './BrickItem'

const MintedBrickDetails = () => {
  const [mintedBrickData, setMintedBrickData] = useState<IBrickItemData | null>()
  const { account } = useWallet()
  const ledgerContract = useLedgerContract()

  const updateMintedBrickData = useCallback(async () => {
    const id = (await ledgerContract.tokenOfOwnerByIndex(account, 0)).toNumber()
    const uri = await ledgerContract.tokenURI(id)
    setMintedBrickData({
      id,
      uri,
      ownerAddress: account || ''
    })
  }, [ledgerContract, account])

  useEffect(() => {
    updateMintedBrickData()
  }, [account, updateMintedBrickData])

  if (!mintedBrickData) {
    return <></>
  }

  return (
    <BrickItem
      id={mintedBrickData.id}
      uri={mintedBrickData.uri}
      ownerAddress={mintedBrickData.ownerAddress}
    />
  )
}

export default MintedBrickDetails
