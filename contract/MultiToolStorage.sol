pragma solidity ^0.5.16;

contract DelegatorAdminStorage {
    address public admin;
    address public pendingAdmin;
    address public multiToolImplementation;
    address public pendingMultiToolImplementation;
}

contract MultiToolV1Storage is DelegatorAdminStorage {}
