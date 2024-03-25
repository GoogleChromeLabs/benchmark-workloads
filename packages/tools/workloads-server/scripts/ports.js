const net = require("node:net");
const os = require("node:os");

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

async function getPorts({ total = 1 }) {
  const ports = [];
  for (let i = 0; i < total; i++) {
    const port = await getPort();
    ports.push(port);
  }
  return ports;
}

async function checkPorts({ ports }) {
  for (const port of ports) {
    try {
      await getPort({ port });
    } catch (e) {
      return false;
    }
  }

  return true;
}

async function checkPort({ port }) {
  try {
    await getPort({ port });
  } catch (e) {
    return false;
  }

  return true;
}

function getLocalHosts() {
  const interfaces = os.networkInterfaces();

  const results = new Set();

  for (const _interface of Object.values(interfaces)) {
    for (const config of _interface) {
      if (config.family === "IPv4") results.add(config.address);
    }
  }

  return results;
}

module.exports = {
  checkPort,
  checkPorts,
  getPort,
  getPorts,
  getLocalHosts,
};
