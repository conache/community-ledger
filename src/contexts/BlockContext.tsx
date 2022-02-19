import React, { useEffect, useRef, useState } from "react";
import { getDefaultProvider } from "../utils";

const BlockContext = React.createContext(0);

const BlockContextProvider: React.FC = ({ children }) => {
  const previousBlock = useRef(0);
  const [block, setBlock] = useState(0);

  useEffect(() => {
    const provider = getDefaultProvider();

    const interval = setInterval(async () => {
      const blockNumber = await provider.getBlockNumber();
      if (blockNumber !== previousBlock.current) {
        previousBlock.current = blockNumber;
        setBlock(blockNumber);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return <BlockContext.Provider value={block}>{children}</BlockContext.Provider>;
};

export { BlockContext, BlockContextProvider };
