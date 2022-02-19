import React from "react";
import useWallet from "../hooks/useWallet";
import { prettifyAccountAddress } from "../utils";

const TopNav = () => {
  const { account } = useWallet();

  return (
    <div className="w-full flex justify-between p-4">
      <h3>xLedger logo</h3>
      {account && <div>{prettifyAccountAddress(account)}</div>}
    </div>
  );
};

export default TopNav;
