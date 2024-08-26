const axios = require('axios');

const transactionHash = '0xd37e06aad9ff4a5ff2447f343ab6de42a34756d26fb848d67d3aaa3c540dce68';
const rpcUrl = 'http://185.230.64.119:8545'; // Replace this with your Ethereum node URL

async function getTransactionReceipt() {
    try {
        const response = await axios.post(rpcUrl, {
            jsonrpc: '2.0',
            method: 'eth_getTransactionReceipt',
            params: [transactionHash],
            id: 1,
        });
        
        if (response.data.error) {
            console.error('Error:', response.data.error.message);
            return null;
        } else {
            console.log('Transaction Receipt:', response.data.result);
            return response.data.result;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

getTransactionReceipt();