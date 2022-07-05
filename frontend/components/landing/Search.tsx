import { NextPage } from "next";
import styles from "@styles/Mint.module.css";
import { VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { checkIsBurned } from "@utils/isBurned";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import useAllBurnedWallets from "hooks/useAllBurnedWallets";
import useChain from "hooks/useChain";

const textList = [
  "just burned 🔥",
  "fried 🍳",
  "extinguished 🧯",
  "toasted 🍞",
];

const Search: NextPage = () => {
  const [hacked, setHacked] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const burnedWallets = useAllBurnedWallets();
  const { chain } = useChain();

  const handleSearch = async (val: string) => {
    try {
      const isBurned = await checkIsBurned(val, chain.name);
      setHacked(isBurned);
      setError(false);
    } catch (err) {
      setError(true);
      setHacked(undefined);
    }
  };

  const getRandomText = () => {
    const num = Math.floor(Math.random() * textList.length);
    return `was ${textList[num]}`;
  };

  const { query } = useRouter();

  useEffect(() => {
    if (query.address) {
      setSearch(query.address as string);
      handleSearch(query.address as string);
    }
  }, [query, chain.name]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>🔥 Is your wallet burned? 🔥</h1>
          <VStack>
            <p style={{ color: "white", marginBottom: "20px" }}>
              {!error ? (
                <>
                  {search}{" "}
                  {search && hacked && (
                    <span style={{ color: "red" }}>is burned!</span>
                  )}
                  {search && hacked === false && (
                    <span style={{ color: "green" }}>is not burned!</span>
                  )}
                  <br />
                  <br />
                  {search && hacked && (
                    <>
                      Check address on etherscan:
                      <br />
                      <a
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        href={`https://etherscan.io/address/${search}`}
                      >
                        etherscan.io/address/{search}
                      </a>
                    </>
                  )}
                </>
              ) : (
                <span style={{ color: "red" }}>Error checking address</span>
              )}
            </p>
          </VStack>
          <div className={styles.scrollContainer}>
            <div className={styles.scroll}>
              {burnedWallets.map((wal: any) => (
                <div>
                  {wal.owner_of} {getRandomText()}
                </div>
              ))}
            </div>
            <div className={styles.scrollFaderTop}></div>
            <div className={styles.scrollFaderBottom}></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;
