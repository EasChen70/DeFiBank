const Tether = artifacts.require('Tether');
const Rewards = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');

const chai = require('chai');
const { describe } = require('node:test');
const assert = chai.assert;

contract('DecentralBank', (accounts) =>{
    let tether, rwd, decentralbank

    function tokens(number){
        return web3.utils.toWei(number, 'ether')
    }
    before(async () => {
        // Load Contracts
        tether = await Tether.new()
        rwd = await Rewards.new()
        decentralbank = await DecentralBank.new(rwd.address, tether.address)

        // Transfer all tokens to DecentralBank(1 Mill)
        await rwd.transfer(DecentralBank.address, tokens('1000000'))
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


})


