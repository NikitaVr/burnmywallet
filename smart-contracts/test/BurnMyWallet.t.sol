// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/BurnMyWallet.sol";

contract BurnMyWalletTest is Test {
    BurnMyWallet burn;
    address minter = address(123456);
    function setUp() public {
        burn = new BurnMyWallet();
    }

    function testCanMint() public {
        vm.prank(minter);
        burn.mint();
        assertEq(burn.balanceOf(minter), 1);
    }

    function testCantMintTwice() public {
        vm.startPrank(minter);
        burn.mint();
        vm.expectRevert("Err: only one BURN token may be minted per account");
        burn.mint();
    }

    function testCantTransfer() public {
        vm.startPrank(minter);
        burn.mint();
        vm.expectRevert("Err: token is SOUL BOUND");
        burn.safeTransferFrom(minter, address(42), 0);
    }
}
