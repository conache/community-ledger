//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CommunityLedger is
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    ERC721EnumerableUpgradeable,
    OwnableUpgradeable
{
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _tokenIds;

    bool private _mintEnabled;
    uint256 private _mintPrice;
    ERC20 public communityToken;

    event Balances(uint256 currentBalance, uint256 wantedBalance);

    function initialize(ERC20 _communityToken) public initializer {
        __ERC721_init("xBrick", "xBRK");
        __ERC721URIStorage_init();
        __ERC721Enumerable_init();
        __Ownable_init();

        _mintPrice = 10 * 10**18;
        communityToken = _communityToken;
    }

    function mint(string memory _uri) public {
        require(_mintEnabled, "Minting not enabled at the moment");
        require(
            balanceOf(msg.sender) == 0,
            "Community members not allowed to mint twice"
        );

        communityToken.transferFrom(msg.sender, address(this), _mintPrice);

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _uri);

        _updateMintPrice();
    }

    function mintPrice() public view returns (uint256) {
        return _mintPrice;
    }

    function mintEnabled() public view returns (bool) {
        return _mintEnabled;
    }

    function setMintingStatus(bool mintEnabled_) public onlyOwner {
        _mintEnabled = mintEnabled_;
    }

    function withdrawMintFee() public onlyOwner {
        uint256 tokens = communityToken.balanceOf(address(this));
        communityToken.transfer(owner(), tokens);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _updateMintPrice() private {
        _mintPrice = _mintPrice.add(_mintPrice.mul(3).div(100));
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        super._burn(tokenId);
    }
}
