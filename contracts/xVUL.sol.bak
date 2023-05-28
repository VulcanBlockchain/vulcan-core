// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./VulcanCore.sol";

contract xVUL {

    VulcanCore public vulcanCore;
    uint256 public MAX_MINT = 100 * 1e18;
    address public owner;

    mapping(address=>uint256) public minted;
    mapping(address => uint256) _balances;
    uint256 private _totalSupply;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(VulcanCore vulcanCoreRef) {

        owner = msg.sender;
        vulcanCore = vulcanCoreRef;
        _mint(msg.sender, 1000 * 1e18);
    }

    function name() public view virtual returns (string memory) {
        return "Vulcan Test";
    }

    function symbol() public view virtual returns (string memory) {
        return "xVUL";
    }

    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    function mint(address _to, uint256 _amount) external {
        require(msg.sender == owner || minted[_to] + _amount <= MAX_MINT, "Exceeds account max mint limit");
        uint256 unrebased = vulcanCore.unrebase(_amount);
        minted[_to] = minted[_to] + unrebased;
        _totalSupply = _totalSupply + unrebased;
        _mint(_to, unrebased);
    }

    function burn(address _address, uint256 _amount) external {
        require(_address == msg.sender || msg.sender == owner, "Cannot burn someone else's tokens");
        uint256 unrebased = vulcanCore.unrebase(_amount);
        _totalSupply = _totalSupply - unrebased;
        _burn(_address, unrebased);
    }

    function taxBalance() public view virtual returns (uint256) {
        return vulcanCore.rebase(_balances[address(this)]);
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return vulcanCore.rebase(_balances[account]);
    }

    function transfer(address to, uint256 amount) public virtual returns (bool) {
        uint256 newAmount = vulcanCore.unrebase(amount);
        uint256 taxAmount = newAmount * (vulcanCore.TREASURY_TAX_RATE() + vulcanCore.FLEX_TAX_RATE() + vulcanCore.FIREPIT_TAX_RATE()) / 1000000;
        _transfer(msg.sender, address(this), taxAmount);
        _transfer(msg.sender, to, newAmount - taxAmount);
        return true;
    }

    function totalSupply() public view virtual returns (uint256) {
        return vulcanCore.rebase(_totalSupply);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "VRC20: transfer from the zero address");
        require(to != address(0), "VRC20: transfer to the zero address");

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "VRC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
            // decrementing then incrementing.
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "VRC20: mint to the zero address");

        _totalSupply += amount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "VRC20: burn from the zero address");

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "VRC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);
    }
}
