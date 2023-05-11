// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./interfaces/IUsdtSwapFactory.sol";
import "./interfaces/IUsdtSwapPool.sol";
import "./UsdtSwapLibrary.sol";

contract UsdtSwapPool is IUsdtSwapPool {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public owner;
    address public factory;
    address public usdt;
    address public token;

    // user => swap token
    mapping(address => uint256) public swapCountOf;
    uint256 public totalSwap;

    uint112 private reserve;
    uint112 private sold;
    uint32 private swapAccountsCount;

    uint112 public maxOutLock;
    uint112 public price;

    /** ---- LOCK ---- */
    uint32 private unlocked = 1;
    modifier lock() {
        require(unlocked == 1, "LOCKED");
        unlocked = 0;
        _;
        unlocked = 1;
    }

    /** ---- CONSTRUCTOR ---- */
    constructor() {
        factory = msg.sender;
    }

    function initialize(address _owner, address _usdt, address _token) external {
        require(msg.sender == factory, "FORBIDDEN");
        owner = _owner;
        usdt = _usdt;
        token = _token;
    }

    function getReserves() public view returns (uint112 _reserve, uint112 _sold, uint32 _swapAccountsCount) {
        _reserve = reserve;
        _sold = sold;
        _swapAccountsCount = swapAccountsCount;
    }

    function _update(uint256 _balance, uint256 _soldCount) private {
        require(_balance <= type(uint112).max && _soldCount <= type(uint112).max, "OVERFLOW");
        reserve = uint112(_balance);
        sold = uint112(_soldCount);
        if (swapCountOf[msg.sender] == 0) swapAccountsCount++;
        emit Sync(reserve, sold);
    }

    function swap(uint256 _tokenOut, address _to) external lock {
        require(_tokenOut > 0, "ZERO_AMOUNT");
        require(_to != address(0), "ZERO_ADDRESS");
        uint256 _purchasable = UsdtSwapLibrary.purchasableTokens(address(this));
        require(_purchasable >= _tokenOut, "INSUFFICIENT_AVAILABLE_PURCHASE");
        uint256 _usdtIn = UsdtSwapLibrary.getUsdtIn(address(this), _tokenOut);
        require(IERC20(usdt).balanceOf(msg.sender) > _usdtIn, "INSUFFICIENT_AVAILABLE_USDT");
        swapCountOf[msg.sender] = swapCountOf[msg.sender].add(_tokenOut);
        totalSwap = totalSwap.add(_tokenOut);
        IERC20(usdt).safeTransferFrom(msg.sender, owner, _usdtIn);
        IERC20(token).safeTransfer(_to, _tokenOut);
        uint256 _balance = IERC20(token).balanceOf(address(this));
        _update(_balance, uint256(sold).add(_tokenOut));
        emit Swap(msg.sender, _usdtIn, _tokenOut, _to);
    }

    /** ---- ONLY OWNER ---- */

    modifier onlyOwner() {
        require(msg.sender == owner, "FORBIDDEN_ONLY_OWNER");
        _;
    }

    function addReserve(uint256 _amount) external lock onlyOwner {
        require(_amount > 0, "ZERO_AMOUNT");
        IERC20(token).safeTransferFrom(msg.sender, address(this), _amount);
        uint256 _balance = IERC20(token).balanceOf(address(this));
        reserve = uint112(_balance);
        emit AddReserve(msg.sender, _amount);
    }

    function subReserve(uint256 _amount, address _to) external lock onlyOwner {
        require(_amount > 0, "ZERO_AMOUNT");
        require(reserve > uint112(_amount), "INSUFFICIENT_AVAILABLE_TOKEN");
        IERC20(token).safeTransfer(_to, _amount);
        uint256 _balance = IERC20(token).balanceOf(address(this));
        _update(_balance, uint256(sold).add(0));
        emit SubReserve(msg.sender, _amount, _to);
    }

    function setPrice(uint112 _newPrice) external onlyOwner {
        price = _newPrice;
    }

    function setMaxOutLock(uint112 _newMaxOut) external onlyOwner {
        maxOutLock = _newMaxOut;
    }

    function setNewOwner(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }
}
