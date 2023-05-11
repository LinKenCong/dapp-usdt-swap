// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IUsdtSwapFactory {
    event PoolCreated(address indexed owner, address indexed token, address pool, uint256);

    function USDT() external view returns (address usdt);

    function allPools(uint256 _index) external view returns (address pool);

    function allPoolsLength() external view returns (uint256);

    function getPool(address _owner, address _token) external view returns (address pool);

    function createPool(address _token) external returns (address pool);

    function feeTo() external view returns (address);

    function fee() external view returns (uint256);

    function setFeeTo(address _feeTo) external;

    function setFee(uint256 _fee) external;
}
