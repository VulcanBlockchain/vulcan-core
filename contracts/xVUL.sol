// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./VulcanCore.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract xVUL is ERC20, VulcanCore {
    uint256 MAX_MINT = 100 * 1e18;
    uint256 MAX_SUPPLY = 375000000 * 1e18;

    constructor() ERC20("xVUL", "xVUL") {
        _mint(msg.sender, 1000 * 1e18);
    }

    function mint(address _to, uint256 _amount) external {
        require(MAX_MINT >= _amount, "Exceeds max mint amount");
        _mint(_to, _amount);
    }

    function burn(address _address, uint256 _amount) external {
        _burn(_address, _amount);
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        //VUL Core changes
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        //VUL Core changes
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
}
