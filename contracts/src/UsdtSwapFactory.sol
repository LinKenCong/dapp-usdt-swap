// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IUsdtSwapFactory.sol";
import "./UsdtSwapPool.sol";

/**
 * @title UsdtSwapFactory
 * @dev This contract implements the IUsdtSwapFactory interface and allows users to create new UsdtSwapPool contracts.
 */
contract UsdtSwapFactory is IUsdtSwapFactory {
    address public immutable USDT;

    // owner => token => pool
    mapping(address => mapping(address => address)) public getPool;
    address[] public allPools;

    /**
     * @dev Initializes the contract with the address of the USDT token.
     * @param _USDT The address of the USDT token.
     */
    constructor(address _USDT) {
        USDT = _USDT;
    }

    /**
     * @dev Gets the number of created pools.
     * @return The number of created pools.
     */
    function allPoolsLength() external view returns (uint256) {
        return allPools.length;
    }

    /**
     * @dev Creates a new UsdtSwapPool contract for a given token.
     * @param _token The address of the token to be swapped.
     * @return pool The address of the newly created UsdtSwapPool contract.
     */
    function createPool(address _token) external returns (address pool) {
        require(_token != address(0), "ZERO_ADDRESS");
        require(getPool[msg.sender][_token] == address(0), "POOL_EXISTS");
        bytes memory bytecode = type(UsdtSwapPool).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, _token));
        assembly {
            pool := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        UsdtSwapPool(pool).initialize(msg.sender, USDT, _token);
        getPool[msg.sender][_token] = pool;
        allPools.push(pool);
        emit PoolCreated(msg.sender, _token, pool, allPools.length);
    }
}
