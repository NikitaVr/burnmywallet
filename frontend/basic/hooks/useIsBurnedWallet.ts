import axios from "axios";
import { IsBurnedResponse } from "pages/api/isBurned";

import { useEffect, useState } from "react";
import useChain from "./useChain";

export const checkIsBurned = async (address: string, chain = "rinkeby") => {
  const result = await axios.get(
    `/api/isBurned?address=${address}&chain=${chain}`
  );
  console.log("handleSearch after api call", result.data);

  const data = result.data as IsBurnedResponse;

  return data.hacked;
};

const useIsBurnedWallet = (address: string) => {
  const { chain } = useChain();
  const [isBurned, setIsBurned] = useState<boolean | undefined>(undefined);
  const checkIsBurnedWalletEffect = async () => {
    const result = await checkIsBurned(address, chain.name);
    setIsBurned(result);
  };
  useEffect(() => {
    checkIsBurnedWalletEffect();
  }, [address]);

  return isBurned;
};

export default useIsBurnedWallet;
