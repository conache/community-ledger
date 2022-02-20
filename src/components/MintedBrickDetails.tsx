import React, { useState, useEffect, useCallback } from 'react'
import { useLedgerContract } from '../hooks/useContract'
import useWallet from '../hooks/useWallet'
import BrickItem, { IBrickItemData } from './BrickItem'
import LoadingText from './LoadingText'

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

  return (
    <div className="flex flex-col items-center">
      {mintedBrickData ? (
        <>
          <div className="mb-4 text-3xl font-bold">
            You're a part of our community now 🍻
          </div>
          <BrickItem
            id={mintedBrickData.id}
            uri={mintedBrickData.uri}
            ownerAddress={mintedBrickData.ownerAddress}
          />
        </>
      ) : (
        <LoadingText />
      )}
    </div>
  )
}

export default MintedBrickDetails
