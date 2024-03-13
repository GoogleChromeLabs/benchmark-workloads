const net = require("node:net");

function getPort(options = { port: 0, host: "localhost" }) {
    return new Promise(function (resolve, reject) {
        const server = net.createServer();
        server.unref();
        server.on("error", reject);

        server.listen(options, function () {
            const { port } = server.address();
            server.close(function () {
                resolve(port);
            });
        });
    });
}

async function getPorts({ total = 1}){
    const ports = [];
    for (let i = 0; i < total; i++) {
        const port = await getPort();
        ports.push(port);
    }
    return ports;
}

module.exports = {
    getPort,
    getPorts
};
