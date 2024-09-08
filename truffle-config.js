require('core-js/stable');
require('regenerator-runtime/runtime');

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1', 
            port: 7545,  
            network_id: '*'  // Match any network id
        },
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/truffle_abis',
    compilers: {
        solc: {
            version: '0.8.19',  // Use a specific version, not a range
            optimizer: {
                enabled: true,
                runs: 200
            },
        }
    }
}