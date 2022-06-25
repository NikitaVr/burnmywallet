// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract BurnMyWallet is ERC721, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("BurnMyWallet", "BURN") {}

    function _baseURI() internal pure override returns (string memory) {

        return "https://burnmywallet.com/";

    }

    function safeMint() public onlyOwner {

        uint256 tokenId = _tokenIdCounter.current();

        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);

    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)

        internal override(ERC721)

        {

            require(from == address(0), "Err: token is SOUL BOUND");

            super._beforeTokenTransfer(from, to, tokenId);

        }

    function _burn(uint256 tokenId)

        internal override(ERC721)

        {

            require(true == false, "Err: cannot burn the BURN token");

        }

}