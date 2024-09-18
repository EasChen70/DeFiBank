const Tether = artifacts.require('Tether');
const Rewards = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');

const chai = require('chai');
const { describe } = require('node:test');
const assert = chai.assert;

contract('DecentralBank', ([owner, customer]) =>{
    let tether, rwd, decentralBank

    function tokens(number){
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        // Load Contracts
        tether = await Tether.new()
        rwd = await Rewards.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        // Transfer all tokens to DecentralBank(1 Mill)
        await rwd.transfer(decentralBank.address, tokens('1000000'), { from: owner })

        // Transfer 100 Tethers to Customer from Owner
        await tether.transfer(customer, tokens('100'), {from: owner})
    })

    describe('Tether Deployment', async () =>{
        it('matches name successfully', async () =>{
            const name = await tether.name()
            assert.equal(name, 'Tether')
        })
    })

    describe('Rewards Deployment', async() =>{
        it('matches name successfuly', async () =>{
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })

    describe('Decentral Bank Deployment', async() =>{
        it('matches name successfuly', async () =>{
            const name = await decentralBank.name()
            assert.equal(name, 'Decentralized Bank')
        })
        it('Contract has tokens', async() =>{
            balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })

    describe('Yield Farming', async () => {
        it('Staking Reward Tokens', async () => {
            let result
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'investor balance before staking')

            // Check staking customer of 100 tokens
            await tether.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('100'), {from: customer})

            //Check updated balance of customer
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'investor balance after staking')  
        
            //Check balance of decentralbank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'decentral bank balance after staking')  
        
            //Is staking balance
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer staking status is true after staking')

        })
    })
})


