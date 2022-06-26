import { createContext } from "react";

export type Chain = {
  name: "rinkeby" | "mumbai" | "optimism";
  chainId: number;
};

export const chains: Record<string, Chain> = {
  rinkeby: {
    name: "rinkeby",
    chainId: 4,
  },
  mumbai: {
    name: "mumbai",
    chainId: 137,
  },
};

export type ChainContextType = {
  chain: Chain;
  switchChain: (name: string) => Promise<void>;
};

export const ChainContext = createContext<ChainContextType>({
  chain: chains.rinkeby,
  switchChain: async () => undefined,
});
