// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/*
            ___                         ___
            (o o)                       (o o)
            (  V  ) SYGNUM HALL OF FAME (  V  )
            --m-m-------------------------m-m--
*/
contract HoF is ERC1155, AccessControl, ERC1155Supply {
    event NewRewards(address[] addrs, uint[] ids);
    using Strings for uint256;
    string public name = 'Hall of Fame';
    string public symbol = 'HoF';
    address _trustedForwarder;
    mapping(address => uint[]) _rewards; //tokenId to be claimed
    bytes32 public constant GRANTER_ROLE = keccak256("GRANTER_ROLE");

    error SBT();
    error ArrayNotMatching();
    error NoRewards();
    error DoesntExist();

    constructor(address trustedForwarder) ERC1155("ipfs://QmY4r4sbYErYQDCRQDj5R7QhoMxypMnEFP7FFEud5WKc4H/") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GRANTER_ROLE, msg.sender);
        _trustedForwarder = trustedForwarder;
    }

    function setURI(string memory newuri) public onlyRole(GRANTER_ROLE) {
        _setURI(newuri);
    }

    function setForwarder(address trustedForwarder) public onlyRole(GRANTER_ROLE) {
        _trustedForwarder = trustedForwarder;
    }

    function grantRewards (address[] memory addrs, uint[] memory ids) public onlyRole(GRANTER_ROLE) {
        if(addrs.length != ids.length) revert ArrayNotMatching();
        for (uint256 index = 0; index < addrs.length; index++) {
            _rewards[addrs[index]].push(ids[index]);
        }
        emit NewRewards(addrs, ids);
    }

    function mint(address receiver) public {
        uint[] memory rewardsArray = _rewards[receiver];
        if(rewardsArray.length == 0) revert NoRewards();
        for (uint256 index = 0; index < rewardsArray.length; index++) {
            _mint(receiver, rewardsArray[index], 1, '0x');
        }
        delete _rewards[receiver];
    }

    function uri(uint256 id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (!ERC1155Supply.exists(id)) revert DoesntExist();
        string memory uri_ = super.uri(id);
        return string(abi.encodePacked(uri_, id.toString()));
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
         if (from != address(0) && to != address(0)) {
            revert SBT();
        }
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
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
