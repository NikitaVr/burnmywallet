import axios from "axios";
import { IsBurnedResponse } from "pages/api/isBurned";

export const checkIsBurned = async (address: string, chain = "rinkeby") => {
  const result = await axios.get(
    `/api/isBurned?address=${address}&chain=${chain}`
  );
  console.log("handleSearch after api call", result.data);

  const data = result.data as IsBurnedResponse;

  return data.hacked;
};
