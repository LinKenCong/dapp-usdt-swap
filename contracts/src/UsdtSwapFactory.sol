// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IUsdtSwapFactory.sol";
import "./interfaces/IUsdtSwapPool.sol";
import "./UsdtSwapPool.sol";

contract UsdtSwapFactory is IUsdtSwapFactory {
    address public immutable USDT;
    address public feeTo;
    uint256 public fee;

    // owner => token => pool
    mapping(address => mapping(address => address)) public getPool;
    address[] public allPools;

    constructor(address _feeTo, address _USDT) {
        feeTo = _feeTo;
        USDT = _USDT;
    }

    function allPoolsLength() external view returns (uint256) {
        return allPools.length;
    }

    function createPool(address _token, uint256 _price, uint256 _maxOutLock) external returns (address pool) {
        require(_token != address(0), "ZERO_ADDRESS");
        require(getPool[msg.sender][_token] == address(0), "POOL_EXISTS");
        bytes memory bytecode = type(UsdtSwapPool).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, _token));
        assembly {
            pool := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IUsdtSwapPool(pool).initialize(msg.sender, USDT, _token, _price, _maxOutLock);
        getPool[msg.sender][_token] = pool;
        allPools.push(pool);
        emit PoolCreated(msg.sender, _token, pool, allPools.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeTo, "FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFee(uint256 _fee) external {
        require(msg.sender == feeTo, "FORBIDDEN");
        fee = _fee;
    }
}
