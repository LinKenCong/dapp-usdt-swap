// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./interfaces/IUsdtSwapFactory.sol";
import "./interfaces/IUsdtSwapPool.sol";

/**
 * @title UsdtSwapPool
 * @dev This contract implements the IUsdtSwapPool interface and allows users to swap USDT for a specific token.
 */
contract UsdtSwapPool is IUsdtSwapPool, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public owner;
    address public factory;
    address public usdt;
    address public token;

    // user => swap token
    mapping(address => uint256) public swapCountOf;
    uint256 public totalSwap;
    uint256 public swapAccountsCount;
    uint256 public sold;

    uint112 public maxOutLock;
    uint112 public price;

    /**
     * @dev Initializes the contract with the address of the factory contract.
     */
    constructor() {
        factory = msg.sender;
    }

    /**
     * @dev Initializes the contract with the owner, USDT, and token addresses.
     * @param _owner The address of the contract owner.
     * @param _usdt The address of the USDT token.
     * @param _token The address of the token to be swapped.
     */
    function initialize(address _owner, address _usdt, address _token) external {
        require(msg.sender == factory, "FORBIDDEN");
        owner = _owner;
        usdt = _usdt;
        token = _token;
    }

    /**
     * @dev Calculates the amount of tokens that can be purchased.
     * @return purchasable The amount of tokens that can be purchased.
     */
    function purchasableTokens() public view returns (uint256 purchasable) {
        uint256 _reserve = IERC20(token).balanceOf(address(this));
        uint256 _sold = sold;
        uint256 _maxOutLock = uint256(maxOutLock);
        uint256 _limit = _maxOutLock <= _reserve ? _maxOutLock : _reserve;
        purchasable = _sold >= _limit ? 0 : _limit.sub(_sold);
    }

    /**
     * @dev Calculates the amount of USDT required to purchase a given amount of tokens.
     * @param _tokenOut The amount of tokens to be purchased.
     * @return usdtIn The amount of USDT required to purchase the tokens.
     */
    function getUsdtIn(uint256 _tokenOut) public view returns (uint256 usdtIn) {
        usdtIn = _tokenOut.mul(price).div(1e18);
    }

    /**
     * @dev Swaps USDT for tokens.
     * @param _tokenOut The amount of tokens to be purchased.
     * @param _to The address to receive the purchased tokens.
     */
    function swap(uint256 _tokenOut, address _to) external nonReentrant {
        require(_tokenOut > 0, "ZERO_AMOUNT");
        require(_to != address(0), "ZERO_ADDRESS");
        require(price > 0, "ZERO_PRICE");
        uint256 _purchasable = purchasableTokens();
        require(_purchasable >= _tokenOut, "INSUFFICIENT_AVAILABLE_PURCHASE");
        uint256 _usdtIn = getUsdtIn(_tokenOut);
        require(IERC20(usdt).balanceOf(msg.sender) >= _usdtIn, "INSUFFICIENT_AVAILABLE_USDT");
        require(IERC20(usdt).allowance(msg.sender, address(this)) >= _usdtIn, "INSUFFICIENT_APPROVE_USDT");
        swapCountOf[msg.sender] = swapCountOf[msg.sender].add(_tokenOut);
        totalSwap = totalSwap.add(_tokenOut);
        sold = sold.add(_tokenOut);
        if (swapCountOf[msg.sender] == 0) swapAccountsCount++;
        IERC20(usdt).safeTransferFrom(msg.sender, owner, _usdtIn);
        IERC20(token).safeTransfer(_to, _tokenOut);
        emit Swap(msg.sender, _usdtIn, _tokenOut, _to);
    }

    /** ---- ONLY OWNER ---- */

    /**
     * @dev Modifier that requires the caller to be the contract owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "FORBIDDEN_ONLY_OWNER");
        _;
    }

    /**
     * @dev Subtracts tokens fromthe contract's reserves and transfers them to a specified address.
     * @param _amount The amount of tokens to subtract from the reserves.
     * @param _to The address to receive the subtracted tokens.
     */
    function subReserve(uint256 _amount, address _to) external nonReentrant onlyOwner {
        require(_amount > 0, "ZERO_AMOUNT");
        uint256 _balance = IERC20(token).balanceOf(address(this));
        require(_balance >= _amount, "INSUFFICIENT_AVAILABLE_TOKEN");
        IERC20(token).safeTransfer(_to, _amount);
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
