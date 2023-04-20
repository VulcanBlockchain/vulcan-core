// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract VulcanCore {

    uint8 public constant BLOCKS_PER_EPOCH = 180;
    uint32 public constant MAX_EPOCH = 735840;
    uint32 public constant REBASE_DIVISOR = 10**8;
    uint64 public constant REBASE_VALUE = 100001256;

    mapping(uint32 => uint64) public rebaseLookup;

    uint32 lastEpoch = 0;


    constructor() {
        rebaseLookup[0] = 100000000;
    }

    // Populate rebase value table for each epoch from genesis to 21 years
    function populateRebaseTable() public {
        require(lastEpoch < MAX_EPOCH, "Table already populated"); 

        for(uint8 i=0;i<250;i++) {
            lastEpoch++;
            if (lastEpoch > MAX_EPOCH) {
                break;
            }
            rebaseLookup[lastEpoch] = (rebaseLookup[lastEpoch-1] * REBASE_VALUE) / REBASE_DIVISOR;
        }   
    }

    function getEpochForBlock(uint256 blockNumber) public pure returns(uint32) {
        return uint32(blockNumber / BLOCKS_PER_EPOCH);
    }

    function getRebaseForEpoch(uint32 epoch) public view returns(uint64) {
        return rebaseLookup[epoch];
    }

    function getRebaseForBlock(uint256 blockNumber) public view returns(uint64) {
        return getRebaseForEpoch(getEpochForBlock(blockNumber));
    }
}