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
contract HoF is ERC1155, Ownable {
    event NewRewards(address[] addrs, uint[] ids);
    using Strings for uint256;
    string _name = 'Hall of Fame';
    string _symbol = 'HoF';
    address _trustedForwarder;
    mapping(address => uint[]) _rewards; //tokenId to be claimed

    constructor(address trustedForwarder) ERC1155("") {
        _trustedForwarder = trustedForwarder;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
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
        for (uint256 index = 0; index < rewardsArray.length; index++) {
            _mint(_msgSender(), rewardsArray[index], 1, '0x');
        }
        delete _rewards[_msgSender()];
    }

    function uri(uint256 id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        string memory uri_ = super.uri(id);
        return
            bytes(uri_).length > 0
                ? string(abi.encodePacked(uri_, id.toString()))
                : "";
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
