const formData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const IPFS_URL = 'https://rpc.particle.network/ipfs/upload';

(async () => {
    const filePath = '1.png';

    const form = new formData();
    form.append('file', fs.createReadStream(filePath));

    let res = await axios.post(IPFS_URL, form, {
        headers: form.getHeaders(),
        auth: {
            username: '6ee9c7d3-0c60-4b07-9fd4-f61b49f2529f',
            password: 'se4KORHdK8t0vl9iwDoAItqahI7BcKqvRPMiFbgV',
        },
    });

    console.log(res.data);
})();