import { NextPage } from "next";
import styles from "@styles/Mint.module.css";
import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { checkIsBurned } from "@utils/isBurned";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { abridgeAddress } from "@utils/abridgeAddress";

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
            <p style={{ color: "white" }}>
              {account?.address}{" "}
              {hacked === true && (
                <span style={{ color: "red" }}>is burned!</span>
              )}
              {hacked === false && (
                <span style={{ color: "green" }}>is not burned!</span>
              )}{" "}
            </p>
          </VStack>
        </main>
      </div>
    </div>
  );
};

export default Search;
