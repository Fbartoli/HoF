// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

/*
  ___                         ___
 (o o)                       (o o)
(  V  ) SYGNUM HALL OF FAME (  V  )
--m-m-------------------------m-m--
*/
import "@opengsn/contracts/src/BasePaymaster.sol";

///a sample paymaster that has whitelists for senders and targets.
/// - if at least one sender is whitelisted, then ONLY whitelisted senders are allowed.
/// - if at least one target is whitelisted, then ONLY whitelisted targets are allowed.
contract WhitelistPaymaster is BasePaymaster {
    bool public useTargetWhitelist;
    mapping(address => bool) public targetWhitelist;

    function whitelistTarget(address target) public onlyOwner {
        targetWhitelist[target] = true;
        useTargetWhitelist = true;
    }

    function versionPaymaster()
        external
        view
        virtual
        override
        returns (string memory)
    {
        return "2.2.5+opengsn.WhitelistPaymaster.ipaymaster";
    }

    function preRelayedCall(
        GsnTypes.RelayRequest calldata relayRequest,
        bytes calldata signature,
        bytes calldata approvalData,
        uint256 maxPossibleGas
    )
        external
        virtual
        override
        returns (bytes memory context, bool revertOnRecipientRevert)
    {
        (relayRequest, signature, approvalData, maxPossibleGas);
        if (useTargetWhitelist) {
            require(
                targetWhitelist[relayRequest.request.to],
                "target not whitelisted"
            );
        }
        return ("", false);
    }

    function postRelayedCall(
        bytes calldata context,
        bool success,
        uint256 gasUseWithoutPost,
        GsnTypes.RelayData calldata relayData
    ) external virtual override {
        (context, success, gasUseWithoutPost, relayData);
    }
}
