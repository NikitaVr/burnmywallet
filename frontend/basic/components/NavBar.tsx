import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const NavBar = () => {
  return (
    <div className={styles.background}>
      <div className={styles.navbar}>
        <div className={styles.leftPartition}>
          <Link href="/" passHref>
            <button className={styles.home}>🔥</button>
          </Link>
          <Link href="/search" passHref>
            <button className={styles.button}>Search</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
