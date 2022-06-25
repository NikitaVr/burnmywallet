import { NextPage } from "next";
import styles from "@styles/Mint.module.css";
import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { checkIsBurned } from "@utils/isBurned";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const Search: NextPage = () => {
  const [hacked, setHacked] = useState<boolean | undefined>(undefined);
  const handleSearch = async (val: string) => {
    console.log("handleSearch");
    const isBurned = await checkIsBurned(val);

    setHacked(isBurned);
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
              <div>
                0xE556B9bfEFDd5B190c67b521ED0A7d19Ab89a311 was just burned 🔥
              </div>
              <div>
                0xc0ffee254729296a45a3885639AC7E10F9d54979 was just burned 🔥
              </div>
              <div>
                0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E was just burned 🔥
              </div>
              <div>
                0xE556B9bfEFDd5B190c67b521ED0A7d19Ab89a311 was just burned 🔥
              </div>
              <div>
                0xc0ffee254729296a45a3885639AC7E10F9d54979 was just burned 🔥
              </div>
              <div>
                0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E was just burned 🔥
              </div>
              <div>
                0xE556B9bfEFDd5B190c67b521ED0A7d19Ab89a311 was just burned 🔥
              </div>
              <div>
                0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E was just burned 🔥
              </div>
              <div>
                0xc0ffee254729296a45a3885639AC7E10F9d54979 was just burned 🔥
              </div>
              <div>
                0xE556B9bfEFDd5B190c67b521ED0A7d19Ab89a311 was just burned 🔥
              </div>
              <div>
                0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E was just burned 🔥
              </div>
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
