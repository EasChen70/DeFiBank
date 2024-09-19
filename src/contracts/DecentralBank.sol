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
        owner = msg.sender;
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
    // Unstake function

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'staking balance must be positive');
        //transfer tokens to a specified contract address from our bank
        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }




    // Issue rewards
    function issueTokens() public{
        //require only owner to issue tokens
        require(msg.sender == owner, 'caller must be owner');
        //Set balances of stakers
        for(uint i = 0; i < stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;
            if(balance > 0){
                reward.transfer(recipient, balance);
            }
        }
    }

    
}