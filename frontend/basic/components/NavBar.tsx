import { Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

const NavBar = () => {
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const value = e.target.elements.search.value;
    console.log(value);
    router.push(`search?address=${value}`);
  };

  return (
    <div className={styles.background}>
      <div className={styles.navbar}>
        <div className={styles.leftPartition}>
          <Link href="/" passHref>
            <Tooltip label="Burn your hacked wallet">
              <button className={styles.home}>🔥</button>
            </Tooltip>
          </Link>
          <Tooltip label="Search if a wallet is marked as compromised">
            <form onSubmit={handleSubmit} className={styles.searchBar}>
              <input
                type="search"
                name="search"
                pattern=".*\S.*"
                required
                id="search"
                placeholder="Enter wallet address"
              />
              <button className={styles.searchBtn} type="submit">
                <span>Search</span>
              </button>
            </form>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
