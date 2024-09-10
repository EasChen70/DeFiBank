const Tether = artifacts.require('Tether');
const Rewards = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');


module.exports = async function(deployer, network, accounts){
    //Deploy Tether Contract
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

    //Deploy Reward Tokens Contract
    await deployer.deploy(Rewards)
    const reward = await Rewards.deployed()

    //Deploy Decentralized Bank Contract
    await deployer.deploy(DecentralBank, reward.address, tether.address)
    const decentralbank = await DecentralBank.deployed()

    // Transfer all reward tokens to decentral bank
    await reward.transfer(decentralbank.address, '1000000000000000000000000')

    //Distribution of tokens to user, in this case 100
    await tether.transfer(accounts[1], '100000000000000000000')
};
