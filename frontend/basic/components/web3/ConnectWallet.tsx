import { useAccount, useNetwork, useDisconnect } from "wagmi";
import WalletModal from "@components/web3/WalletModal";
import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

type ConnectWalletProps = {
  isMobile?: boolean;
  size?: string;
};

const ConnectWallet = ({ isMobile, size }: ConnectWalletProps) => {
  const { data } = useAccount();
  const { activeChain, switchNetwork } = useNetwork();
  const {
    isOpen: connectIsOpen,
    onOpen: connectOnOpen,
    onClose: connectOnClose,
  } = useDisclosure();

  const { disconnect } = useDisconnect();

  const targetChain = parseInt(process.env.NEXT_PUBLIC_TARGET_CHAIN!); // 31337; //4

  useEffect(() => {
    if (activeChain?.id !== targetChain && switchNetwork)
      switchNetwork(targetChain);
  }, [activeChain]);

  return (
    <>
      {!data ? (
        <Button
          style={{
            color: "#4b4f56",
            borderRadius: "0",
          }}
          onClick={connectOnOpen}
          size={size}
        >
          Connect Wallet
        </Button>
      ) : activeChain?.id === targetChain ? (
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                style={{
                  color: "#4b4f56",
                  borderRadius: "0",
                  overflow: "hidden",
                }}
              >
                Account: {abridgeAddress(data?.address)}
              </MenuButton>
              <MenuList
                color="black"
                style={{
                  color: "#4b4f56",
                  borderRadius: "0",
                  width: "100%",
                }}
              >
                <MenuItem>
                  <Link
                    href="/mypage"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    View My Collection
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    disconnect();
                  }}
                >
                  Disconnect Wallet
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      ) : (
        <Button
          style={{
            color: "#4b4f56",
            borderRadius: "0",
          }}
          onClick={() => switchNetwork && switchNetwork(targetChain)}
        >
          Switch to Rinkeby
        </Button>
      )}
      <WalletModal isOpen={connectIsOpen} closeModal={connectOnClose} />
    </>
  );
};

export default ConnectWallet;
