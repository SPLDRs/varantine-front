const port = 4000;

const ip = (function () {
    if (!process.env.LOCAL_IP)
        return "ec2-34-208-42-160.us-west-2.compute.amazonaws.com:4005";
    const interfaces = require('os').networkInterfaces();
    let keys = Object.keys(interfaces);

    for (let i = 0; i < keys.length; ++i) {
        let interfaces_ = interfaces[keys[i]];
        for (let j = 0; j < interfaces_.length; ++j) {
            let interface_ = interfaces_[j];
            if ('IPv4' === interface_.family && interface_.internal === false)
                return interface_.address + ':' + port;
        }
    }
    return '127.0.0.1:' + port;
})();
console.log('============================');
console.log('Configured IP: ' + ip);
console.log('============================');

const fs = require('fs');
const api_js_path = __dirname + '/api-config.js';
// let f = fs.readFileSync(api_js_path, 'utf8');
// f = f.replace(/ip *= *'[^']*'/mg, "ip = '" + ip + "'");
fs.writeFileSync(api_js_path,
    'export const apiUrl = "http://' + ip + '";');