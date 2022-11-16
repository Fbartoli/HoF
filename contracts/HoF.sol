// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
/*
  ___                         ___
 (o o)                       (o o)
(  V  ) SYGNUM HALL OF FAME (  V  )
--m-m-------------------------m-m--
*/
/// @custom:security-contact florent.bartoli@sygnum.com
contract HoF is ERC1155, Ownable, ERC1155Supply {
    using Strings for uint256;
    string _baseUri;
    address _trustedForwarder;

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

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
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

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
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
