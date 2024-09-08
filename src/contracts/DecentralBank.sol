// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import './Rewards.sol';
import './Tether.sol';

contract DecentralBank{
    string public name = 'Decentralized Bank';
    address public owner;
    Tether public tether;
    Reward public reward;

    constructor(Reward _reward, Tether _tether){
        reward = _reward;
        tether = _tether;
    }

}