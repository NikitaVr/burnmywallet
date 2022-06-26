import {
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

const NavBar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const value = e.target.elements.search.value;
    console.log(value);
    router.push(`search?address=${value}`);
  };

  const handleNetworkChange = (e: any) => {
    e.preventDefault();
    const value = e.target.value;
    console.log(value);
  };

  return (
    <div className={styles.background}>
      <div className={styles.navbar}>
        <div className={styles.leftPartition}>
          <Tooltip label="Burn your hacked wallet">
            <div style={{ display: "flex" }}>
              <Link href="/" passHref>
                <button className={styles.home}>🔥</button>
              </Link>
            </div>
          </Tooltip>
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
        <HStack>
          <Select onChange={handleNetworkChange}>
            <option className={styles.searchBtn} value="rinkeby">
              Rinkeby
            </option>
            <option className={styles.searchBtn} value="mumbai">
              Polygon Mumbai
            </option>
          </Select>
          <Tooltip label="How can you keep yourself safe?">
            <div style={{ display: "flex" }}>
              <button className={styles.home} onClick={onOpen}>
                🧑‍🚒 <div className={styles.right}>Safety first</div>
              </button>
            </div>
          </Tooltip>
        </HStack>
      </div>
      <AboutModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

function AboutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ textAlign: "center" }}>
            💁🏽‍♂️ So You've Been Hacked...
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div style={{ padding: "0 30px" }}>
              <p className={styles.modalBody}>
                🪦 Sorry my friend, but it's gone.
              </p>
              <p className={styles.modalBody}>
                🔑 If you lost your seedphrase, you've lost your wallet and
                there's nothing you can do to make it safe again.
              </p>
              <p className={styles.modalBody}>
                🔑 Create a new wallet and new seed phrase. Transfer anything
                you have left into the new wallet.
              </p>
              <p className={styles.modalBody}>
                🧊 For the safest web3 experience: Get a cold wallet!
              </p>

              <p className={styles.modalBody}>
                <strong>Some tips for NFTs:</strong>
                <ul>
                  <li>
                    Keep 1 burner wallet for minting; never keep more than 0.2
                    eth or any NFTs you care about
                  </li>
                  <li>
                    Keep 1 trading wallet for mid-range NFTs that you might
                    trade
                  </li>
                  <li>
                    Keep 1 cold wallet for your diamond handed NFTs; NEVER
                    connect to internet <em>especially</em> public wifi
                  </li>
                </ul>
              </p>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default NavBar;
