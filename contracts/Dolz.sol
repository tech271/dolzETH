// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IMintableERC20} from "./interface/IMintableERC20.sol";
import {NativeMetaTransaction} from "./common/NativeMetaTransaction.sol";
import {ContextMixin} from "./common/ContextMixin.sol";
import {AccessControlMixin} from "./common/AccessControlMixin.sol";

contract Dolz is
    ERC20,
    AccessControlMixin,
    NativeMetaTransaction,
    ContextMixin,
    IMintableERC20
{
    bytes32 public constant PREDICATE_ROLE = keccak256("PREDICATE_ROLE");

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 _initialSupply
    ) ERC20(name_, symbol_) {
        _setupContractId("Dolz");

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(PREDICATE_ROLE, _msgSender());

        _mint(_msgSender(), _initialSupply);
        _initializeEIP712(name_);
    }

    /**
     * @dev See {IMintableERC20-mint}.
     */
    function mint(address user, uint256 amount)
        external
        override
        only(PREDICATE_ROLE)
    {
        _mint(user, amount);
    }

    function _msgSender() internal view virtual override returns (address) {
        return ContextMixin.msgSender();
    }
}
