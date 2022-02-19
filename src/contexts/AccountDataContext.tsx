import React, { useEffect, useCallback } from "react";
import { BigNumber } from "ethers";
import { useState } from "react";
import useBlock from "../hooks/useBlock";
import TokenContract from "../artifacts/contracts/CommunityPowerToken.sol/CommunityPowerToken.json";
import LedgerContract from "../artifacts/contracts/CommunityLedger.sol/CommunityLedger.json";
import useContract from "../hooks/useContract";
import constants from "../contants";
import useWallet from "../hooks/useWallet";

interface IAccountData {
  tokenBalance: BigNumber;
  nftBalance: number;
}

const DEFAULT_VALUES = {
  tokenBalance: BigNumber.from(0),
  nftBalance: 0,
};

const AccountDataContext = React.createContext<IAccountData>(DEFAULT_VALUES);

const AccountDataContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IAccountData>(DEFAULT_VALUES);

  const { account } = useWallet();
  const currentBlock = useBlock();

  const tokenContract = useContract(constants.tokenContractAddr, TokenContract.abi);
  const ledgerContract = useContract(constants.ledgerContractAddr, LedgerContract.abi);

  const updateAccountData = useCallback(async () => {
    if (!account) {
      return setState(DEFAULT_VALUES);
    }

    const [tokenBalance, nftBalance] = await Promise.all<any>([tokenContract.balanceOf(account), ledgerContract.balanceOf(account)]);
    setState({
      tokenBalance,
      nftBalance,
    });
  }, [ledgerContract, tokenContract, account]);

  useEffect(() => {
    updateAccountData();
  }, [account, currentBlock, updateAccountData]);

  return <AccountDataContext.Provider value={{ ...state }}>{children}</AccountDataContext.Provider>;
};

export { AccountDataContext, AccountDataContextProvider };
