// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SwapToken {
    using SafeMath for uint256;

    struct Wallet {
        address account;
        uint256 maxSwap;
        uint256 price;
    }
    // pay to
    address public immutable payee;
    // Token
    IERC20 public immutable TOKEN;
    // USDT
    IERC20 public immutable USDT;
    // Swap wallet address
    Wallet[] public wallets;
    // Current wallet index
    uint8 public walletIndex;
    // Total Swap Accounts
    uint8 public totalSwapAccounts;
    // Total Swap Tokens
    uint256 public totalSwapToken;
    // All accounts per wallet
    mapping(uint8 => uint8) public swapAccounts;
    // Amount of tokens exchanged per wallet
    mapping(uint8 => uint256) public swapToken;
    mapping(uint8 => mapping(address => uint256)) private _swapAccountToken;
    // Total Swap Token Of account
    mapping(address => uint256) public totalSwapOf;

    uint8 private unlocked = 1;
    modifier lock() {
        require(unlocked == 1, "LOCKED");
        unlocked = 0;
        _;
        unlocked = 1;
    }

    constructor(
        address _token,
        address _usdt,
        address _payee,
        address[6] memory _wallets,
        uint256[6] memory _maxSwap,
        uint256[6] memory _price
    ) {
        TOKEN = IERC20(_token);
        USDT = IERC20(_usdt);
        payee = _payee;

        for (uint256 i = 0; i < _wallets.length; i++) {
            require(_wallets[i] != address(0), "Wallet address cannot be zero");
            wallets.push(Wallet({account: _wallets[i], maxSwap: _maxSwap[i], price: _price[i]}));
        }
    }

    function getWalletAccout(uint8 _index) public view returns (address) {
        return wallets[_index].account;
    }

    function getWalletMaxSwap(uint8 _index) public view returns (uint256) {
        return wallets[_index].maxSwap;
    }

    function getWalletPrice(uint8 _index) public view returns (uint256) {
        return wallets[_index].price;
    }

    function getWalletSwapOf(uint8 _index, address _account) public view returns (uint256) {
        return _swapAccountToken[_index][_account];
    }

    // Calculate the number of convertible tokens
    function getTokenOut(uint8 _index, uint256 usdtIn) public view returns (uint256) {
        uint256 price = wallets[_index].price;
        require(price > 0, "Wallet price cannot be zero");
        return usdtIn.mul(10 ** 18).div(price);
    }

    // Calculate the current wallet convertible balance
    function purchasableTokens(uint8 _index) public view returns (uint256) {
        uint256 maxSwap = wallets[_index].maxSwap;
        require(maxSwap > 0, "Wallet maxSwap cannot be zero");
        uint256 swapped = swapToken[_index];
        if (swapped >= maxSwap) {
            return 0;
        }
        return maxSwap.sub(swapped);
    }

    // Swap USDT to Token
    function swap(uint256 usdtIn) external lock {
        require(msg.sender != address(0), "Sender address cannot be zero");
        require(USDT.balanceOf(msg.sender) >= usdtIn, "Insufficient usdt balance");
        require(usdtIn > 0, "Cannot be zero.");
        // get swap token amount
        uint256 _tokenOut = getTokenOut(walletIndex, usdtIn);
        // get current wallet
        Wallet memory _wallet = wallets[walletIndex];
        // verify and check
        require(_wallet.account != address(0), "The wallet should be initialized.");
        require(purchasableTokens(walletIndex) >= _tokenOut, "Insufficient tokens available for purchase.");
        require(TOKEN.balanceOf(_wallet.account) >= _tokenOut, "Insufficient contract balance.");
        require(TOKEN.allowance(_wallet.account, address(this)) >= _tokenOut, "Insufficient contract allowance.");
        // update contract status
        if (totalSwapOf[msg.sender] == 0) {
            totalSwapAccounts++;
        }
        if (_swapAccountToken[walletIndex][msg.sender] == 0) {
            swapAccounts[walletIndex]++;
        }
        totalSwapToken += _tokenOut;
        totalSwapOf[msg.sender] += _tokenOut;
        swapToken[walletIndex] += _tokenOut;
        _swapAccountToken[walletIndex][msg.sender] += _tokenOut;
        // get new wallet index
        uint256 _purchasable = purchasableTokens(walletIndex);
        require(_purchasable == 0 || _purchasable >= _wallet.price, "Surplus cannot be less than price.");
        if (_purchasable == 0 && walletIndex < wallets.length - 1) {
            walletIndex++;
        }
        // pay usdt to payee
        USDT.transferFrom(msg.sender, payee, usdtIn);
        // transfer token to buyer
        TOKEN.transferFrom(_wallet.account, msg.sender, _tokenOut);
        emit Swap(_wallet.account, msg.sender, usdtIn, _tokenOut);
    }

    event Swap(address wallet, address user, uint256 usdtIn, uint256 tokenOut);
}
/*
@Todo
1. 将交易池内置入合约（新增交易代币池ERC20合约），可创建交易池，不限数组
2. 优化view数据获取方式
3. 重新命名所以文件名、函数及变量
4. 引入SafeERC20库
5. 重写变量储存方式

GPT:
下面是一些优化合约存储结构的建议：
对 totalSwapAccounts 和 walletIndex 使用 uint256 而不是 uint8。 这将允许在合约中存储更多的账户和钱包。
将 uint256 用于 Wallet 结构中的 maxSwap 和 price。 这将允许更大的最大交换量和更精确的价格计算。
使用地址到结构的映射来存储钱包信息，而不是结构数组。 这将允许更有效地查找和更新钱包信息。
将 swapAccounts 和 _swapAccountToken 映射组合成钱包索引到地址到交换金额的映射。 这将简化存储结构并降低气体成本。
使用 OpenZeppelin 的 SafeERC20 库来简化 USDT 和 Token 的传输。 这将减少代码量和潜在错误。
*/