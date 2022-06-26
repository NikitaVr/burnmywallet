import axios from "axios";
import { IsBurnedResponse } from "pages/api/isBurned";

export const checkIsBurned = async (address: string, chain = "rinkeby") => {
  const result = await axios.get(
    `/api/isBurned?address=${address}&chain=${chain}`
  );

  const data = result.data as IsBurnedResponse;

  return data.hacked;
};
