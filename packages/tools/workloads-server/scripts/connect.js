const fs = require("fs-extra");
const net = require("net");
const { getLocalHosts } = require("./ports");
const { showLoadingAnimation } = require("./loader");

const connectionTimeout = 300;
const retryTimeout = 500;
const maxTimeout = 10000;

function checkConnection({ host, port }) {
  return new Promise((resolve) => {
    const connection = net.connect(port, host);
    connection.on("error", function () {
      resolve(false);
    });
    connection.on("timeout", function () {
      connection.end();
      resolve(false);
    });
    connection.on("connect", function () {
      connection.end();
      console.log(`\nConnection detected on port ${port}!\n`);
      resolve(true);
    });
    connection.setTimeout(connectionTimeout);
  });
}

async function waitForConnection({ host, port }) {
  if (await checkConnection({ host, port })) {
    return true;
  }

  await new Promise((resolve) => setTimeout(resolve, retryTimeout));
  return waitForConnection({ host, port });
}

async function waitForConnectionWithTimeout({ host, port }) {
  const timeoutRef = setTimeout(function () {
    process.once("exit", () =>
      console.error(`Connection on port ${port} failed!`)
    );
    process.exit(0);
  }, maxTimeout);

  const response = await waitForConnection({ host, port });
  clearTimeout(timeoutRef);
  return response;
}

async function connect() {
  if (!process.env.DATA) {
    throw Error("No data file passed in!");
  }

  const { ports } = JSON.parse(fs.readFileSync(process.env.DATA, "utf-8"));

  const hosts = [...getLocalHosts()];
  // just using one local host value for now
  const host = hosts[0];

  const loadingRef = showLoadingAnimation({
    text: "Waiting for connection.",
  });

  await Promise.all(
    ports.map((port) => waitForConnectionWithTimeout({ port, host }))
  );

  clearInterval(loadingRef);
  console.log("All ports are connected!");
}

connect();
