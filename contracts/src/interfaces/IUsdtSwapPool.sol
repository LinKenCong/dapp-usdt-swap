// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IUsdtSwapPool {
    event Sync(uint112 reserve, uint112 sold);

    event Swap(address indexed sender, uint256 usdtIn, uint256 tokenOut, address indexed to);

    event AddReserve(address indexed _owner, uint256 _amount);

    event SubReserve(address indexed _owner, uint256 _amount, address indexed to);

    function owner() external view returns (address owner);

    function factory() external view returns (address factory);

    function usdt() external view returns (address usdt);

    function token() external view returns (address token);

    function totalSwap() external view returns (uint256);

    function swapCountOf(address account) external view returns (uint256);

    function maxOutLock() external view returns (uint112);

    function price() external view returns (uint112);

    function getReserves() external view returns (uint112 _reserve, uint112 _sold, uint32 _swapAccountsCount);

    function initialize(address _owner, address _usdt, address _token) external;

    function swap(uint256 _tokenOut, address _to) external;
}
