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

const MintedBricks = () => {
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

  return (
    <>
      {bricks.map(({ uri, id, ownerAddress }) => (
        <BrickItem
          key={`minted-brick-${id}`}
          id={id}
          uri={uri}
          ownerAddress={ownerAddress}
        />
      ))}
    </>
  )
}

export default MintedBricks
