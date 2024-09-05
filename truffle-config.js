import 'core-js/stable';
import 'regenerator-runtime/runtime';

//Connect to Ganache Network
module.exports = {
    networks:{
        development:{
            host: '127.0.0.1:',
            port: '7544',
            network_id: '5777'
        },
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/truffle_abis',
    compilers:{
        solc: {
            version: '^0.8.19',
            optimizer: {
                enabled: true,
                runs: 200
            },
        }
    }
}