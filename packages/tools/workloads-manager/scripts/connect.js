const net = require("net");
const { getLocalHosts } = require("./ports");

const connectionTimeout = 300;
const retryTimeout = 500;
const maxTimeout = 10000;

function checkConnection({ host, port }) {
    return new Promise((resolve) => {
        const connection = net.connect(port, host)
        connection.on('error', function() {
            resolve(false);
        });
        connection.on('timeout', function() {
            connection.end();
            resolve(false);
        });
        connection.on('connect', function() {
            connection.end();
            console.log(`Connection detected on port ${port}!`)
            resolve(true);
        });
        connection.setTimeout(connectionTimeout)
    });
}

async function waitForConnection({ host, port }) {
    if (await checkConnection({ host, port })) {
        return true
    }

    await new Promise(resolve => setTimeout(resolve, retryTimeout));
    return waitForConnection({ host, port })
}

async function waitForConnectionWithTimeout({ host, port }) {
    const timeoutRef = setTimeout(function() {
        process.once("exit", () => console.error(`Connection on port ${port} failed!`))
        process.exit(0);
    }, maxTimeout);

    const response = await waitForConnection({ host, port });
    clearTimeout(timeoutRef);
    return response;
}

async function connect() {
    const hosts = getLocalHosts();
    // just testing first available local host
    const host = hosts.values().next().value;
    const data = [
        { host, port: 3001 },
        { host, port: 3002 },
        { host, port: 3003 },
        { host, port: 3004 }
    ];

    await Promise.all(data.map(({host, port}) => waitForConnectionWithTimeout({host, port})));
    console.log("All ports are connected!")
}

connect();
