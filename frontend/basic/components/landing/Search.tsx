import { NextPage } from "next";
import styles from "@styles/Mint.module.css";
import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { checkIsBurned } from "@utils/isBurned";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import useAllBurnedWallets from "hooks/useAllBurnedWallets";

const textList = [
  "just burned 🔥",
  "fried 🍳",
  "extinguished 🧯",
  "toasted 🍞",
];

const Search: NextPage = () => {
  const [hacked, setHacked] = useState<boolean | undefined>(undefined);
  const burnedWallets = useAllBurnedWallets();
  console.log("burnedWallets", burnedWallets);
  const handleSearch = async (val: string) => {
    console.log("handleSearch");
    const isBurned = await checkIsBurned(val);

    setHacked(isBurned);
  };

  const getRandomText = () => {
    const num = Math.floor(Math.random() * textList.length);
    return `was ${textList[num]}`;
  };

  const { data: account } = useAccount();

  const { query } = useRouter();

  useEffect(() => {
    if (query.address) {
      handleSearch(query.address as string);
    }
  }, [query]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>🔥 Is your wallet burned? 🔥</h1>
          <VStack>
            <p style={{ color: "white", marginBottom: "20px" }}>
              {account?.address}{" "}
              {hacked === true && (
                <span style={{ color: "red" }}>is burned!</span>
              )}
              {hacked === false && (
                <span style={{ color: "green" }}>is not burned!</span>
              )}{" "}
              <br />
              <br />
              {account?.address && (
                <>
                  Check address on etherscan:
                  <br />
                  <a
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    href={`https://etherscan.io/address/${account.address}`}
                  >
                    etherscan.io/address/{account.address}
                  </a>
                </>
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
