// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// export type IsBurnedResponse = {
//   msg?: string;
//   hacked?: boolean;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  console.log("all burned");
  /** validate req type **/
  if (req.method !== "GET") {
    res.status(400);
    return;
  }

  const chain = req.query.chain;

  if (!chain) {
    res.status(400);
    return;
  }

  const response = await axios.get(
    `https://deep-index.moralis.io/api/v2/nft/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/owners?chain=${chain}`,
    {
      headers: {
        accept: "application/json", //the token is a variable which holds the token
        "X-API-Key": process.env.MORALIS_API_KEY!,
      },
    }
  );

  console.log("response", response.data);

  if (!response.data) {
    res.status(500);
    return;
  }

  if (response.data) {
    res.status(200).json(response.data);
  }
}
