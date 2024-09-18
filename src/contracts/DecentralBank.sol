// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import './Rewards.sol';
import './Tether.sol';

contract DecentralBank{
    string public name = 'Decentralized Bank';
    address public owner;
    Tether public tether;
    Reward public reward;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
    constructor(Reward _reward, Tether _tether){
        reward = _reward;
        tether = _tether;
    }

    // Staking function
    function depositTokens(uint _amount) public{
        //prereq for staking
        require(_amount > 0, 'Invalid amount');

        //Transfer tether to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //Update staking balance
        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);   
        }
        
        //Update balances
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}