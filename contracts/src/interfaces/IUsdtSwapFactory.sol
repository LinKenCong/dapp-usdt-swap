// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IUsdtSwapFactory {
    event PoolCreated(address indexed owner, address indexed token, address pool, uint256);

    function USDT() external view returns (address usdt);

    function allPools(uint256 _index) external view returns (address pool);

    function allPoolsLength() external view returns (uint256);

    function getPool(address _owner, address _token) external view returns (address pool);

    function createPool(address _token) external returns (address pool);
}
