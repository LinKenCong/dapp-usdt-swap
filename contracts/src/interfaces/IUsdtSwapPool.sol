// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IUsdtSwapPool {
    event Swap(address indexed sender, uint256 usdtIn, uint256 tokenOut, address indexed to);

    event SubReserve(address indexed owner, uint256 amount, address indexed to);

    function owner() external view returns (address owner);

    function factory() external view returns (address factory);

    function usdt() external view returns (address usdt);

    function token() external view returns (address token);

    function totalSwap() external view returns (uint256);

    function swapCountOf(address account) external view returns (uint256);

    function maxOutLock() external view returns (uint112);

    function price() external view returns (uint112);

    function swapAccountsCount() external view returns (uint256);

    function sold() external view returns (uint256);

    function getUsdtIn(uint256 tokenOut) external view returns (uint256 usdtIn);

    function purchasableTokens() external view returns (uint256 purchasable);

    function swap(uint256 tokenOut, address to) external;

    function subReserve(uint256 amount, address to) external;

    function setPrice(uint112 newPrice) external;

    function setMaxOutLock(uint112 newMaxOut) external;

    function setNewOwner(address newOwner) external;
}
