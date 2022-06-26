import { ChevronDownIcon } from "@chakra-ui/icons";
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
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  ButtonProps,
} from "@chakra-ui/react";
import useChain from "hooks/useChain";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

const Dropdown = (props: ButtonProps) => (
  <Button colorScheme="facebook" width="100%" {...props} />
);

const testnetMap = {
  rinkeby: "Ethereum",
  mumbai: "Polygon",
  optimism: "Optimism",
};

const imagesMap = {
  mumbai:
    "data:image/png;base64,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",
  rinkeby:
    "data:image/png;base64,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",
};

const NavBar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain, switchChain } = useChain();

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
          <div
            style={{
              position: "relative",
              marginRight: "20px",
              width: "200px",
            }}
          >
            <Menu colorScheme="facebook">
              <MenuButton as={Dropdown} rightIcon={<ChevronDownIcon />}>
                <HStack>
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src={imagesMap[chain.name]}
                    mr="12px"
                  />
                  <div>{testnetMap[chain.name]}</div>
                </HStack>
              </MenuButton>
              <MenuList bgColor="facebook.900">
                <MenuItem
                  onClick={() => switchChain("rinkeby")}
                  as={Dropdown}
                  minH="48px"
                >
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src={imagesMap.rinkeby}
                    alt="Ethereum - Rinkeby"
                    mr="12px"
                  />
                  <span>Ethereum</span>
                </MenuItem>
                <MenuItem
                  onClick={() => switchChain("mumbai")}
                  as={Dropdown}
                  minH="40px"
                >
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src={imagesMap.mumbai}
                    alt="Polygon - Mumbai"
                    mr="12px"
                  />
                  <span>Polygon</span>
                </MenuItem>
                <MenuItem
                  className={styles.disabledBtn}
                  disabled
                  as={Button}
                  minH="40px"
                >
                  <div style={{ marginRight: "12px" }}>🔴</div>
                  <span>Optimism</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
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
