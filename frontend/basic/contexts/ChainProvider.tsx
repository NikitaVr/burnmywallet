import { useCallback, useEffect, useState } from "react";
import { ethers, Signer } from "ethers";
import { Chain, chains, ChainContext } from "./chain";

type ChainProviderProps = {
  children?: React.ReactNode;
};

export const ChainProvider = ({
  children,
}: ChainProviderProps): JSX.Element => {
  const [chain, setChain] = useState<Chain>(chains.rinkeby);

  const switchChain = useCallback(async (name: string) => {
    setChain(chains[name]);
  }, []);

  return (
    <ChainContext.Provider
      value={{
        chain,
        switchChain,
      }}
    >
      {children}
    </ChainContext.Provider>
  );
};
