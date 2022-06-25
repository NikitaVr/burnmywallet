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

const targetChain = parseInt(process.env.NEXT_PUBLIC_TARGET_CHAIN!); //31337; //4

const PRICE = 0.02;
const Search: NextPage = () => {
  const { data: account } = useAccount();
  const { activeChain, switchNetwork } = useNetwork();

  const [payable, setPayable] = useState(BigInt(20000000000000000).toString());
  const [numPublicMint, setNumPublicMint] = useState(3);
  const [hasMinted, setHasMinted] = useState(false);
  const handleChange = (value: number | string) =>
    setNumPublicMint(Number(value));

  const {
    data: publicSaleData,
    error: publicSaleError,
    isError: publicSaleIsError,
    isLoading: publicSaleIsLoading,
    write: publicSaleWrite,
  } = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
        ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
        : "0xCa4E3b3f98cCA9e801f88F13d1BfE68176a03dFA",
      contractInterface: myNFT.abi,
    },
    "safeMint",
    {
      // overrides: {
      //   value: payable,
      // },
      // args: [numPublicMint],
      args: [],
      onError(error) {
        console.log(error);
      },
      onSuccess(data) {
        console.log(data);
        setHasMinted(true);
      },
    }
  );

  const handlePublicMint = async () => {
    const payableInEth = PRICE * numPublicMint;
    const payableinWei = web3.utils.toWei(payableInEth.toString(10), "ether");
    setPayable(payableinWei);
    await publicSaleWrite();
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>🔥 Search Burned Wallets 🔥</h1>
          <VStack>
            {/* select # of tokens to mint */}
            <Input color="white"></Input>
            <HStack>
              <Button
                style={{
                  color: "#4b4f56",
                  borderRadius: "0",
                }}
                onClick={handlePublicMint}
              >
                Search
                {publicSaleIsLoading && <Spinner marginLeft={2} />}
              </Button>
            </HStack>

            {publicSaleIsError && (
              <p style={{ color: "red" }}>
                Error:{" "}
                {publicSaleError?.message.includes("Max tokens to mint") &&
                  "Minted max tokens"}
                {/* this happens sometimes when there is a race condition on the payable state */}
                {publicSaleError?.message.includes("Incorrect ETH") &&
                  "Please try again."}
                {publicSaleError?.message.includes("not open") &&
                  "Public sale is currently closed"}
                {publicSaleError?.message.includes("insufficient funds") &&
                  "Insufficient funds"}
                {publicSaleError?.message.includes(
                  "Insufficient tokens remaining"
                ) && "The collection has fully minted"}
                {publicSaleError?.message.includes("User rejected request") &&
                  "User rejected request"}
              </p>
            )}
          </VStack>
        </main>
      </div>
    </div>
  );
};

export default Search;
