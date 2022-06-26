import { NextPage } from "next";
import styles from "@styles/Mint.module.css";
import { Image, Link, Tooltip, VStack } from "@chakra-ui/react";
import { useAccount, useContractWrite, useDisconnect, useNetwork } from "wagmi";
import myNFT from "@data/BurnMyWallet.json";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import ConnectWallet from "@components/web3/ConnectWallet";
import { checkIsBurned } from "@utils/isBurned";
import useChain from "hooks/useChain";

// const targetChain = parseInt(process.env.NEXT_PUBLIC_TARGET_CHAIN!); //31337; //4

const Mint: NextPage = () => {
  const { data: account } = useAccount();
  const { activeChain, switchNetwork } = useNetwork();
  const [hasMinted, setHasMinted] = useState(false);
  const [alreadyBurned, setAlreadyBurned] = useState(false);
  const [burn, setBurn] = useState(false);
  const { chain } = useChain();

  const { disconnect } = useDisconnect();

  const {
    data: publicSaleData,
    isLoading: publicSaleIsLoading,
    write: publicSaleWrite,
  } = useContractWrite(
    {
      addressOrName: chain.contractAddress,
      // addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      //   ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      //   : "0xCa4E3b3f98cCA9e801f88F13d1BfE68176a03dFA",
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
    if (!account) return;
    const isBurned = await checkIsBurned(account.address!, chain.name);
    console.log("isBurned", isBurned);
    setBurn(true);
    if (isBurned) {
      setAlreadyBurned(true);
      return;
    }
    await publicSaleWrite();
  };

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <div className={styles.fire}>
          <div className={styles.bottom}></div>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
        </div>
        <div className={styles.reverse}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className={styles.container}>
        <main className={styles.main}>
          <VStack>
            <h3 className={styles.text}>
              Connect to your hacked wallet
              <br />
              &amp; set it on 🔥 <span className={styles.burntText}>
                fire
              </span>{" "}
              🔥
            </h3>
            {hasMinted && publicSaleData ? (
              <VStack>
                <p style={{ color: "white" }}>
                  Your transaction was sent! Click here to view your
                  transaction:
                </p>
                <Link
                  href={`${
                    process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL ||
                    "https://rinkeby.etherscan.io"
                  }/tx/${publicSaleData.hash}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "white",
                    borderRadius: "0",
                  }}
                >
                  Etherscan: {abridgeAddress(publicSaleData.hash)}
                </Link>
              </VStack>
            ) : !account?.address ? (
              <VStack>
                <ConnectWallet />
              </VStack>
            ) : activeChain?.id !== chain.chainId ? (
              <VStack>
                <p style={{ color: "white" }}>You're on the wrong Network!</p>
                <a
                  href="#"
                  className={styles.btn}
                  onClick={() => {
                    switchNetwork && switchNetwork(chain.chainId);
                  }}
                >
                  Switch Network
                </a>
              </VStack>
            ) : (
              <VStack>
                <Tooltip label={account?.address}>
                  <button
                    className={styles.btn}
                    onClick={handlePublicMint}
                    disabled={alreadyBurned}
                  >
                    Burn {abridgeAddress(account?.address)}
                    {publicSaleIsLoading && <Spinner marginLeft={2} />}
                  </button>
                </Tooltip>
                <div
                  className={burn ? styles.bounceOutDown : styles.walletIcon}
                >
                  <Tooltip
                    label={`Drop ${abridgeAddress(
                      account?.address
                    )} into the flames`}
                  >
                    <Image src="assets/eth-wallet.png" alt="wallet icon" />
                  </Tooltip>
                </div>
                {alreadyBurned && (
                  <p style={{ color: "white", marginTop: 30, zIndex: 2 }}>
                    Already burned wallet {abridgeAddress(account?.address)}.
                    <br />
                    <a
                      href="#"
                      className={styles.disconnectBtn}
                      onClick={() => disconnect()}
                    >
                      Disconnect
                    </a>{" "}
                    to burn another wallet.
                  </p>
                )}
              </VStack>
            )}
          </VStack>
        </main>
      </div>
    </div>
  );
};

export default Mint;
