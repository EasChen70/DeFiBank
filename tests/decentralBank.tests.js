const Tether = artifacts.require('Tether');
const Rewards = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', (accounts) =>{
    describe('Tether Deployment', async () =>{
        it('matches name successfully', async () =>{
            let tether = await Tether.new()
            const name = tether.name()
            assert.equal(name, 'Tether')
        })
    })
})