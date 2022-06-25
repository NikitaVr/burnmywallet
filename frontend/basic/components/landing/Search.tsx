import { NextPage } from "next";
import styles from "@styles/Mint.module.css";
import { Button, HStack, Input, Link, VStack } from "@chakra-ui/react";
import { useAccount, useContractWrite, useNetwork } from "wagmi";
import myNFT from "@data/BurnMyWallet.json";
import { useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
} from "@chakra-ui/react";
import web3 from "web3";
import { abridgeAddress } from "@utils/abridgeAddress";
import ConnectWallet from "@components/web3/ConnectWallet";
import axios from "axios";
import { IsHackedResponse } from "pages/api/isHacked";

const targetChain = parseInt(process.env.NEXT_PUBLIC_TARGET_CHAIN!); //31337; //4

const PRICE = 0.02;
const Search: NextPage = () => {
  const [value, setValue] = useState("");
  const [hacked, setHacked] = useState<boolean | undefined>(undefined);
  const handleSearch = async () => {
    console.log("handleSearch");
    const result = await axios.get(
      `/api/isHacked?address=${value}&chain=rinkeby`
    );
    console.log("handleSearch after api call", result.data);

    const data = result.data as IsHackedResponse;

    setHacked(data.hacked);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>🔥 Check if a Wallet is Burned 🔥</h1>
          <VStack>
            {/* select # of tokens to mint */}
            <Input
              color="white"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              width="30em"
            />
            <HStack>
              <Button
                style={{
                  color: "#4b4f56",
                  borderRadius: "0",
                }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </HStack>
            {hacked === true && <p style={{ color: "red" }}>Hacked!</p>}
            {hacked === false && <p style={{ color: "green" }}>Not Hacked!</p>}
          </VStack>
        </main>
      </div>
    </div>
  );
};

export default Search;
