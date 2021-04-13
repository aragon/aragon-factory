// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.8;

import "./vocdoni/token-storage-proof.sol";
import "./govern/GovernBaseFactory.sol";

contract AragonFactory {
    GovernBaseFactory governBase;

    constructor() public {
        governBase = GovernBaseFactory(
            0x84e83439A3511b6E4Cd97714577dD4D58Ad8d684
        );
    }

    function createDAO(
        string memory _name,
        IERC20 _token,
        string memory _tokenName,
        string memory _tokenSymbol,
        bool _useProxies
    ) public {
        governBase.newGovernWithoutConfig(
            _name,
            _token,
            _tokenName,
            _tokenSymbol,
            _useProxies
        );
    }
}
