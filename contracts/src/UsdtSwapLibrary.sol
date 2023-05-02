// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./UsdtSwapPool.sol";

library UsdtSwapLibrary {
    using SafeMath for uint256;

    function purchasableTokens(address _pool) public view returns (uint256 purchasable) {
        (uint112 _reserve, uint112 _sold, ) = UsdtSwapPool(_pool).getReserves();
        uint112 _maxOutLock = UsdtSwapPool(_pool).maxOutLock();
        uint112 _limit = _reserve <= _maxOutLock ? _reserve : _maxOutLock;
        if (_limit <= _sold) {
            purchasable = 0;
        } else {
            purchasable = uint256(_limit).sub(uint256(_sold));
        }
    }

    function getUsdtIn(address _pool, uint256 _tokenOut) public view returns (uint256 usdtIn) {
        uint112 _price = UsdtSwapPool(_pool).price();
        usdtIn = _tokenOut.mul(_price).div(1e18);
    }
}
