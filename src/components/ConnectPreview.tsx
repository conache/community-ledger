import React from "react";
import { ethers } from "ethers";
import usePlarformData from "../hooks/usePlatformData";
import useWallet from "../hooks/useWallet";
const {
  utils: { formatEther },
} = ethers;

const ConnectPreview = () => {
  const { connectWallet } = useWallet();
  const { mintPrice, tokenSymbol, mintedBricksCount } = usePlarformData();

  return (
    <div className="w-full flex-col text-center">
      <div>Message placeholder explaining the idea</div>
      <div>
        Message that explains the price, {formatEther(mintPrice)} {tokenSymbol} and minted bricks {mintedBricksCount.toString()}.
      </div>
      {<button onClick={connectWallet}>Connect wallet</button>}
    </div>
  );
};

export default ConnectPreview;
