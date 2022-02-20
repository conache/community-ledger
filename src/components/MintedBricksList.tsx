import React, { useEffect, useCallback } from 'react'
import { useState } from 'react'
import { useLedgerContract } from '../hooks/useContract'
import usePlarformData from '../hooks/usePlatformData'
import BrickItem from './BrickItem'

interface BrickPreview {
  id: number
  uri: string
  ownerAddress: string
}

const MintedBricksList = () => {
  const [bricks, setBricks] = useState<BrickPreview[]>([])
  const { mintedBricksCount } = usePlarformData()
  const ledgerContract = useLedgerContract()

  const updateBricksData = useCallback(async () => {
    const tokenURICalls = []
    const tokenOwnersCalls = []

    for (let tokenId = mintedBricksCount; tokenId >= 1; tokenId--) {
      tokenURICalls.push(ledgerContract.tokenURI(tokenId))
      tokenOwnersCalls.push(ledgerContract.ownerOf(tokenId))
    }

    const bricksUriList = await Promise.all<string>(tokenURICalls)
    const bricksOwnersList = await Promise.all<string>(tokenOwnersCalls)

    setBricks(
      bricksUriList.map((uri, index) => ({
        uri,
        id: mintedBricksCount - index,
        ownerAddress: bricksOwnersList[index]
      }))
    )
  }, [ledgerContract, mintedBricksCount])

  useEffect(() => {
    updateBricksData()
  }, [mintedBricksCount, updateBricksData])

  if (mintedBricksCount === 0) {
    return <></>
  }

  return (
    <>
      <div className="flex items-baseline pb-2 pr-20 mb-4 ml-20 text-3xl font-bold border-b-2">
        <div className="mr-2 text-6xl">🧱</div> MINTED xBRICKS ({mintedBricksCount})
      </div>

      <div className="flex gap-10 px-20 py-5 overflow-auto">
        {bricks.map(({ uri, id, ownerAddress }) => (
          <BrickItem
            key={`minted-brick-${id}`}
            id={id}
            uri={uri}
            ownerAddress={ownerAddress}
          />
        ))}
      </div>
    </>
  )
}

export default MintedBricksList
