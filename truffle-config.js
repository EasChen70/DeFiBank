require('core-js/stable');
require('regenerator-runtime/runtime');

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',  // Remove the colon at the end
            port: 7544,  // This should be a number, not a string
            network_id: '5777'
        },
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/truffle_abis',
    compilers: {
        solc: {
            version: '^0.8.19',
            optimizer: {
                enabled: true,
                runs: 200
            },
        }
    }
}