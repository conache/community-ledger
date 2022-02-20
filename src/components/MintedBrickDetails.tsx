import React, { useState, useEffect, useCallback } from 'react'
import useAccountData from '../hooks/useAccountData'
import { useLedgerContract } from '../hooks/useContract'
import BrickItem, { IBrickItemData } from './BrickItem'
import LoadingText from './LoadingText'

const MintedBrickDetails = () => {
  const [mintedBrickData, setMintedBrickData] = useState<IBrickItemData | null>()
  const { account, nftBalance } = useAccountData()
  const ledgerContract = useLedgerContract()

  const updateMintedBrickData = useCallback(async () => {
    if (!nftBalance) {
      return
    }

    const id = (await ledgerContract.tokenOfOwnerByIndex(account, 0)).toNumber()
    const uri = await ledgerContract.tokenURI(id)
    setMintedBrickData({
      id,
      uri,
      ownerAddress: account || ''
    })
  }, [ledgerContract, nftBalance, account])

  useEffect(() => {
    updateMintedBrickData()
  }, [account, updateMintedBrickData])

  return (
    <div className="flex flex-col items-center">
      {mintedBrickData ? (
        <>
          <div className="mb-4 text-3xl font-bold">
            Cheers! You're a part of our community 🍻
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
