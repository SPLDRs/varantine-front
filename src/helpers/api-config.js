const port = 4000;

const ip = (function () {
    const ifaces = require('os').networkInterfaces();
    let r = '127.0.0.1';

    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' === iface.family && iface.internal === false)
                r = iface.address;
        });
    });
    window.alert(r);
    return r;
    
})();

export const apiUrl = 'http://' + ip + ':' + port;