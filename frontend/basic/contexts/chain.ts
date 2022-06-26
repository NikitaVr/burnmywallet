import { createContext } from "react";

export type Chain = {
  name: "rinkeby" | "mumbai" | "optimism";
  chainId: number;
  contractAddress: string;
};

export const chains: Record<string, Chain> = {
  rinkeby: {
    name: "rinkeby",
    chainId: 4,
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  },
  mumbai: {
    name: "mumbai",
    chainId: 80001,
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON_MUMBAI!,
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
