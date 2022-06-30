// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

import "./VerifySignature.sol";

contract BurnMyWallet is ERC721, Ownable, VerifySignature {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("BurnMyWallet", "BURN") {}

    string constant public burnMessage = "BurnMyWallet";

    /*
    sets a dummy baseURI
    */
    function _baseURI() internal pure override returns (string memory) {
        return "https://burnmywallet.com/";
    }

    /*
    mint a BURN token to the sender
    */
    function mint() public {
        _burnWallet(msg.sender);
    }

    function burnWithMessageSignature(address _signer, uint256 _nonce, bytes memory _signature) public {
        require(verify(_signer, address(this), 0, burnMessage, _nonce, _signature), "Invalid Signature");
        _burnWallet(_signer);
    }

    /*
    prevent a user from transferring a token
    */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721) {
        require(from == address(0), "Err: token is SOUL BOUND");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /*
    prevent a user from burning a token
    */
    function _burn(uint256) internal override(ERC721) {
        revert("Err: cannot burn the BURN token");
    }

    function _burnWallet(address _wallet) internal {
        require(
            balanceOf(_wallet) == 0,
            "Err: only one BURN token may be minted per account"
        );
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_wallet, tokenId);
    }
}
