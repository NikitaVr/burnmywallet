// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { chains } from "contexts/chain";

export type IsBurnedResponse = {
  msg?: string;
  hacked?: boolean;
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<IsBurnedResponse>
// ) {
//   /** validate req type **/
//   if (req.method !== "GET") {
//     res.status(400);
//     return;
//   }

//   const address = req.query.address;
//   if (!address) {
//     res.status(400).json({ msg: "address is required" });
//     return;
//   }

//   if (typeof address != "string") {
//     res.status(400).json({ msg: "address is poorly formatted" });
//     return;
//   }

//   const chain = req.query.chain;

//   if (!chain) {
//     res.status(400).json({ msg: "chain is required" });
//     return;
//   }

//   const response = await axios.get(
//     // `https://deep-index.moralis.io/api/v2/${address}/nft/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}?chain=rinkeby&format=decimal`,
//     `https://api-eu1.tatum.io/v3/nft/address/balance/${chain}/${address}`,
//     {
//       headers: {
//         accept: "application/json", //the token is a variable which holds the token
//         "X-API-Key": process.env.TATUM_API_KEY!,
//       },
//     }
//   );

//   if (!response.data) {
//     res.status(500);
//     return;
//   }

//   if (response.data) {
//     res.status(200).json({
//       hacked: response.data.total > 0,
//     });
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IsBurnedResponse>
) {
  /** validate req type **/
  if (req.method !== "GET") {
    res.status(400);
    return;
  }

  const address = req.query.address;
  if (!address) {
    res.status(400).json({ msg: "address is required" });
    return;
  }

  if (typeof address != "string") {
    res.status(400).json({ msg: "address is poorly formatted" });
    return;
  }

  const chain = req.query.chain as string;

  if (!chain) {
    res.status(400).json({ msg: "chain is required" });
    return;
  }

  console.log("isBurned", chain, address);

  const response = await axios.get(
    `https://deep-index.moralis.io/api/v2/${address}/nft/${chains[chain].contractAddress}?chain=${chain}&format=decimal`,
    {
      headers: {
        accept: "application/json", //the token is a variable which holds the token
        "X-API-Key": process.env.MORALIS_API_KEY!,
      },
    }
  );

  console.log("isBurned data", response.data);

  if (!response.data) {
    res.status(500);
    return;
  }

  if (response.data) {
    res.status(200).json({
      hacked: response.data.total > 0,
    });
  }
}
