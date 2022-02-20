import React from 'react'
import { ethers } from 'ethers'
import usePlarformData from '../hooks/usePlatformData'
const {
  utils: { formatEther }
} = ethers

const ProgressBanner = () => {
  const { mintPrice, tokenSymbol, mintedBricksCount } = usePlarformData()

  return (
    <div className="flex justify-between w-full bg-blue-dark px-6 py-2">
      <div className="flex">
        Mint price
        <div className="font-bold text-blue-light mr-2">(+3%/tx):</div>
        <div className="flex">
          {formatEther(mintPrice)}{' '}
          <div className="text-blue-light ml-1 font-bold">{tokenSymbol}</div>
        </div>
      </div>

      <div className="flex">
        Minted bricks:
        <div className="text-blue-light ml-1 font-bold">
          {mintedBricksCount.toString()}
        </div>
      </div>
    </div>
  )
}

export default ProgressBanner
