import axios from "axios";
import { useEffect, useState } from "react";
import useChain from "./useChain";

const getAllBurnedWallets = async (chain = "rinkeby") => {
  const result = await axios.get(`/api/allBurned?&chain=${chain}`);
  console.log("BURNED WALLETS RESULT", result);

  return result.data.result;
};

const useAllBurnedWallets = () => {
  const { chain } = useChain();
  const [burnedWallets, setBurnedWallets] = useState([]);
  const getAllBurnedWalletsEffect = async () => {
    const result = await getAllBurnedWallets(chain.name);
    setBurnedWallets(result);
  };
  useEffect(() => {
    getAllBurnedWalletsEffect();
  }, []);

  return burnedWallets;
};

export default useAllBurnedWallets;
