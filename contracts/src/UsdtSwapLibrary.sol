// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./interfaces/IUsdtSwapPool.sol";

/**
 * @title UsdtSwapLibrary
 * @dev This library provides utility functions for UsdtSwapPool contracts.
 */
library UsdtSwapLibrary {
    using SafeMath for uint256;

    /**
     * @dev Calculates the amount of tokens that can be purchased from a given UsdtSwapPool contract.
     * @param _pool The address of the UsdtSwapPool contract.
     * @return purchasable The amount of tokens that can be purchased.
     */
    function purchasableTokens(address _pool) public view returns (uint256 purchasable) {
        (uint256 _reserve, uint256 _sold) = IUsdtSwapPool(_pool).getReserves();
        uint256 _maxOutLock = uint256(IUsdtSwapPool(_pool).maxOutLock());
        uint256 _limit = _maxOutLock <= _reserve ? _maxOutLock : _reserve;
        purchasable = _sold >= _limit ? 0 : _limit.sub(_sold);
    }

    /**
     * @dev Calculates the amount of USDT required to purchase a given amount of tokens from a given UsdtSwapPool contract.
     * @param _pool The address of the UsdtSwapPool contract.
     * @param _tokenOut The amount of tokens to be purchased.
     * @return usdtIn The amount of USDT required to purchase the tokens.
     */
    function getUsdtIn(address _pool, uint256 _tokenOut) public view returns (uint256 usdtIn) {
        uint112 _price = IUsdtSwapPool(_pool).price();
        usdtIn = _price == 0 ? _tokenOut : _tokenOut.mul(_price).div(1e18);
    }
}
