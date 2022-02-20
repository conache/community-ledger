import React from 'react'
import { BigNumber, ethers } from 'ethers'
import usePlarformData from '../hooks/usePlatformData'
const {
  utils: { formatEther }
} = ethers

interface ITokenAmount {
  amount: BigNumber
  symbol?: string | null
}

const TokenAmount = ({ amount, symbol }: ITokenAmount) => (
  <div className="flex">
    {parseFloat(formatEther(amount)).toFixed(2)}{' '}
    <div className="ml-1 font-bold text-blue-light">{symbol}</div>
  </div>
)

const ProgressBanner = () => {
  const { mintPrice, tokenSymbol, mintedBricksCount, raisedTokens } = usePlarformData()

  return (
    <div className="flex justify-between w-full px-6 py-2 bg-blue-dark">
      <div className="flex">
        <div className="flex font-bold">
          Mint price
          <div className="mr-2 text-blue-light">(+3%/tx):</div>
        </div>
        <TokenAmount amount={mintPrice} symbol={tokenSymbol} />
      </div>

      <div className="flex font-bold">
        <div className="mr-2 font-bold">Minted bricks:</div>
        <div className="text-blue-light">{mintedBricksCount.toString()}</div>
      </div>

      <div className="flex">
        <div className="mr-2 font-bold">Raised XYZ:</div>
        <TokenAmount amount={raisedTokens} symbol={tokenSymbol} />
      </div>
    </div>
  )
}

export default ProgressBanner
