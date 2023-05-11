// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./interfaces/IUsdtSwapPool.sol";

library UsdtSwapLibrary {
    using SafeMath for uint256;

    function purchasableTokens(address _pool) public view returns (uint256 purchasable) {
        (uint112 _reserve, uint112 _sold, ) = IUsdtSwapPool(_pool).getReserves();
        uint112 _maxOutLock = IUsdtSwapPool(_pool).maxOutLock();
        uint112 _limit = _reserve;
        if (_maxOutLock > 0 && _reserve > _maxOutLock) _limit = _maxOutLock;
        purchasable = _sold >= _limit ? 0 : uint256(_limit).sub(uint256(_sold));
    }

    function getUsdtIn(address _pool, uint256 _tokenOut) public view returns (uint256 usdtIn) {
        uint112 _price = IUsdtSwapPool(_pool).price();
        usdtIn = _price == 0 ? _tokenOut : _tokenOut.mul(_price).div(1e18);
    }
}
