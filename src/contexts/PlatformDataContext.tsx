import React, { useState, useCallback, useEffect } from "react";
import { BigNumber } from "ethers";
import TokenContract from "../artifacts/contracts/CommunityPowerToken.sol/CommunityPowerToken.json";
import LedgerContract from "../artifacts/contracts/CommunityLedger.sol/CommunityLedger.json";
import useContract from "../hooks/useContract";
import useBlock from "../hooks/useBlock";
import constants from "../contants";

interface IPlarformData {
  tokenName?: string | null;
  tokenSymbol?: string | null;
  mintPrice: BigNumber;
  mintEnabled: boolean;
  mintedBricksCount: BigNumber;
}

const PlatformDataContext = React.createContext<IPlarformData>({
  tokenName: null,
  tokenSymbol: null,
  mintPrice: BigNumber.from(0),
  mintEnabled: false,
  mintedBricksCount: BigNumber.from(0),
});

const PlatformDataContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IPlarformData>({
    tokenName: null,
    tokenSymbol: null,
    mintPrice: BigNumber.from(0),
    mintEnabled: false,
    mintedBricksCount: BigNumber.from(0),
  });

  const currentBlock = useBlock();
  const tokenContract = useContract(constants.tokenContractAddr, TokenContract.abi);
  const ledgerContract = useContract(constants.ledgerContractAddr, LedgerContract.abi);

  const updateData = useCallback(async () => {
    const [tokenName, tokenSymbol, mintPrice, mintEnabled, mintedBricksCount] = await Promise.all<any>([
      tokenContract.name(),
      tokenContract.symbol(),
      ledgerContract.mintPrice(),
      ledgerContract.mintEnabled(),
      ledgerContract.mintedBricksCount(),
    ]);

    setState({
      tokenName,
      tokenSymbol,
      mintPrice,
      mintEnabled,
      mintedBricksCount,
    });
  }, [ledgerContract, tokenContract]);

  useEffect(() => {
    updateData();
  }, [currentBlock, updateData]);

  return <PlatformDataContext.Provider value={{ ...state }}>{children}</PlatformDataContext.Provider>;
};

export { PlatformDataContext, PlatformDataContextProvider };
