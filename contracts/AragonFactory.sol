// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.8;

import "./vocdoni/token-storage-proof.sol";
import "./govern/GovernBaseFactory.sol";

contract AragonFactory {
    constructor() public {
        TokenStorageProof tokenProof =
            TokenStorageProof(0xf215116795EE6add4789a8E891CAEB26A623221d);
        GovernBaseFactory governBase =
            GovernBaseFactory(0xe071Fc0C53Be275cF7246D16373A74231fA5a585);
    }
}
