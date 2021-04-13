// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.8;

import "import "https://github.com/aragon/govern/blob/develop/packages/govern-create/contracts/GovernBaseFactory.sol";";
import "https://github.com/vocdoni/dvote-solidity/blob/main/contracts/token-storage-proof.sol";

contract AragonFactory {
    TokenStorageProof tokenProof;
    GovernBaseFactory governBase;

    constructor() public {
        tokenProof = TokenStorageProof(
            0xf215116795EE6add4789a8E891CAEB26A623221d
        );
    }

    function createDAO(IERC20 tokenAddress) public {
        tokenProof.registerToken(
            0x8255E1FaF4d977708f622DbA724c62ee2C0aB0FC,
            0,
            block.number,
            hex"00000000000000000000000000000000000000000000000000",
            hex"000000000000000000000000000000000000000000000000000000",
            hex"0000000000000000000000000000000000000000000000000000000000"
        );
    }
}
