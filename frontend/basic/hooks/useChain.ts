import { useContext } from "react";
import { ChainContext, ChainContextType } from "../contexts/chain";

const useChain = (): ChainContextType => {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error("useChain must be used within a ChainProvider");
  }
  return context;
};

export default useChain;
