import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useWallet from "./useWallet";

const useContract = (address: string, abi: ethers.ContractInterface) => {
  const { signer } = useWallet();
  const [contract, setContract] = useState(new ethers.Contract(address, abi, signer));

  useEffect(() => {
    setContract(new ethers.Contract(address, abi, signer));
  }, [abi, address, signer]);

  return contract;
};

export default useContract;
