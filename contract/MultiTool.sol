pragma solidity ^0.5.16;

import "./SafeMath.sol";
import "./IERC20.sol";
import "./Delegator.sol";
import "./MultiToolStorage.sol";

contract MultiTool is MultiToolV1Storage {

    constructor() public {
        admin = msg.sender;
    }

    function _become(Delegator delegator) public {
        require(msg.sender == delegator.admin(), "only delegator admin can change brains");
        require(delegator._acceptImplementation() == 0, "change not authorized");
    }

    function multiTransferNativeToken(address[] memory accounts, uint256 simpleAmount) payable public {
        require(accounts.length > 0, "Missing recipient address");
        require(simpleAmount > 0, "Missing amount of transfers");

        uint256 totalAmount = SafeMath.mul(accounts.length, simpleAmount);
        require(totalAmount == msg.value, "Insufficient native token balance");

        for (uint i = 0; i < accounts.length; i++) {
            address(uint160(accounts[i])).transfer(simpleAmount);
        }
    }

    function multiTransferERC20Token(address[] memory accounts, uint256 simpleAmount, address fromToken) public {
        require(accounts.length > 0, "Missing recipient address");
        require(simpleAmount > 0, "Missing amount of transfers");
        require(fromToken != address(0), "ERC20 token must be address");

        uint256 totalAmount = SafeMath.mul(accounts.length, simpleAmount);
        IERC20 token = IERC20(fromToken);
        require(totalAmount <= token.balanceOf(msg.sender), "Insufficient erc20 token balance");

        for (uint i = 0; i < accounts.length; i++) {
            token.transferFrom(msg.sender, accounts[i], simpleAmount);
        }
    }
}
