/************************************************************************
 * Benchmark Connector
 *
 * postMessage is used to communicate between app and benchmark.
 * When the app os ready, an 'app-ready' message is sent to signal that the app can receive instructions.
 *
 * A prepare script within the apps appends window.name and window.version from the package.json file.
 * The appId is build by appending name-version
 * It's used as an additional safe-guard to ensure the correct app responds to a message.
 *************************************************************************/
const appId = window.name && window.version ? `${window.name}-${window.version}` : -1;

function sendMessage(message) {
  window.requestAnimationFrame(() => {
      setTimeout(() => {
        setTimeout(() => {
          window.top.postMessage(
            message,
            "*"
          );
        }, 0);
      }, 0);
    });
}

window.onmessage = async (event) => {
  // ensure we only let legit functions run...
  if (event.data.id !== appId || event.data.key !== "benchmark-connector")
    return;

  switch(event.data.type) {
    case "benchmark-suite":
      window.benchmarkTestManager.getSuiteByName(event.data.name).run();
      sendMessage({ type: "test-complete", status: "success", appId });
      break;
    case "benchmark-suite-async":
      await window.benchmarkTestManager.getSuiteByName(event.data.name).runAsync();
      sendMessage({ type: "test-complete", status: "success", appId });
      break;
    case "benchmark-suite-test":
      window.benchmarkTestManager.getSuiteByName(event.data.name).getTestByName(event.data.test).run();
      sendMessage({ type: "test-complete", status: "success", appId });
      break;
    case "benchmark-suite-test-async":
      await window.benchmarkTestManager.getSuiteByName(event.data.name).getTestByName(event.data.test).runAsync();
      sendMessage({ type: "test-complete", status: "success", appId });
      break;
  }
};

sendMessage({ type: "app-ready", status: "success", appId });

console.log(`Hello, benchmark connector for ${appId} is ready!`);
