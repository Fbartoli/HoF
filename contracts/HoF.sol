// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*
            ___                         ___
            (o o)                       (o o)
            (  V  ) SYGNUM HALL OF FAME (  V  )
            --m-m-------------------------m-m--
*/
/// @custom:security-contact florent.bartoli@sygnum.com
contract HoF is ERC1155, Ownable {
    event NewRewards(address[] addrs, uint[] ids);
    using Strings for uint256;
    string _baseUri;
    address _trustedForwarder;
    mapping(address => uint[]) _rewards; //tokenId to be claimed

    constructor(string memory baseUri, address trustedForwarder) ERC1155("") {
        _baseUri = baseUri;
        _trustedForwarder = trustedForwarder;
    }

    function setURI(string memory newuri) public onlyOwner {
        _baseUri = newuri;
    }

    function setForwarder(address trustedForwarder) public onlyOwner {
        _trustedForwarder = trustedForwarder;
    }

    function grantRewards (address[] memory addrs, uint[] memory ids) public onlyOwner {
        require(addrs.length == ids.length);
        for (uint256 index = 0; index < addrs.length; index++) {
            require(ids[index] != 0);
            _rewards[addrs[index]].push(ids[index]);
        }
        emit NewRewards(addrs, ids);
    }

    function mint() public {
        uint[] memory rewardsArray = _rewards[_msgSender()];
        require(rewardsArray.length > 0);
        delete rewardsArray;
        for (uint256 index = 0; index < rewardsArray.length; index++) {
            _mint(_msgSender(), rewardsArray[index], 1, '0x');
        }
    }

    function uri(uint256 id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return string(abi.encodePacked(_baseUri, id.toString()));
    }

    // The following functions are overrides required by Solidity.

    function safeTransferFrom(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual override {
        revert();
    }

    /**
     * @dev See {IERC1155-safeBatchTransferFrom}.
     */
    function safeBatchTransferFrom(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual override {
        revert();
    }

    function isTrustedForwarder(address forwarder)
        public
        view
        virtual
        returns (bool)
    {
        return forwarder == _trustedForwarder;
    }

    function _msgSender()
        internal
        view
        virtual
        override
        returns (address sender)
    {
        if (isTrustedForwarder(msg.sender)) {
            // The assembly code is more direct than the Solidity version using `abi.decode`.
            /// @solidity memory-safe-assembly
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        } else {
            return super._msgSender();
        }
    }

    function _msgData()
        internal
        view
        virtual
        override
        returns (bytes calldata)
    {
        if (isTrustedForwarder(msg.sender)) {
            return msg.data[:msg.data.length - 20];
        } else {
            return super._msgData();
        }
    }
}
