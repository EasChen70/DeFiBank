//Makes sure during deployment, migration contract is being ran

const Migrations = artifacts.require('Migrations')

module.exports = function deployer(){
    deployer.deploy(Migrations)
}

