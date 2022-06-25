import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";
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
            <button className={styles.home}>🔥</button>
          </Link>
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
        </div>
      </div>
    </div>
  );
};

export default NavBar;
