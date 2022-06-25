import axios from "axios";
import { useEffect, useState } from "react";

const getAllBurnedWallets = async (chain = "rinkeby") => {
  const result = await axios.get(`/api/allBurned?&chain=${chain}`);
  console.log("BURNED WALLETS RESULT", result);

  return result.data.result;
};

const useAllBurnedWallets = (chain = "rinkeby") => {
  const [burnedWallets, setBurnedWallets] = useState([]);
  const getAllBurnedWalletsEffect = async () => {
    const result = await getAllBurnedWallets(chain);
    setBurnedWallets(result);
  };
  useEffect(() => {
    getAllBurnedWalletsEffect();
  }, []);

  return burnedWallets;
};

export default useAllBurnedWallets;
