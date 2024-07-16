/************************************************************************ 
  Custom History Events

  Augments some history events with additional events for consistency:

  - window.pushstate
  - window.replacestate
  - window.statechange
*************************************************************************/
function triggerEvent(element, name, state) {
  const event = new CustomEvent(name);
  event.name = name;
  event.state = state;
  element.dispatchEvent(event);
}

const pushState = history.pushState;
history.pushState = function (state) {
  const fn = pushState.apply(history, arguments);
  triggerEvent(window, "pushstate", state);
  triggerEvent(window, "statechange", state);
  return fn;
};

const replaceState = history.replaceState;
history.replaceState = function (state) {
  const fn = replaceState.apply(history, arguments);
  triggerEvent(window, "replacestate", state);
  triggerEvent(window, "statechange", state);
  return fn;
};

window.addEventListener("popstate", function (event) {
  triggerEvent(window, "statechange", event.state);
});

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

window.onmessage = async (event) => {
  // ensure we only let legit functions run...
  if (event.data.id !== appId || event.data.key !== "benchmark-connector")
    return;

  switch(event.data.type) {
    case "benchmark-test-step":
        window.benchmarkTestManager.getSuiteByName(event.data.test).getTestByName(event.data.step).run();
        sendMessage({ type: "test-complete", status: "success", appId });
        break;
    case "benchmark-test-function":
        // eslint-disable-next-line no-case-declarations
        const testFunction = new Function(`return ${event.data.fn}`)();
        if (testFunction) {
            requestAnimationFrame(() => {
                performance.mark(`${event.data.step}-start`);
            });
            requestAnimationFrame(async () => {
                await testFunction();
                setTimeout(() => {
                    performance.mark(`${event.data.step}-end`);
                    performance.measure(`${event.data.step}`, {
                        start: `${event.data.step}-start`,
                        end: `${event.data.step}-end`,
                    });
                    const result = JSON.stringify(
                    performance.getEntriesByName(`${event.data.step}`)[0]);
                    window.top.postMessage({ type: "test-complete", status: "success", appId, result },"*");
                }, 0);
            });
        }
  }
};

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

sendMessage({ type: "app-ready", status: "success", appId });

console.log(`Hello, benchmark connector for ${appId} is ready!`);
