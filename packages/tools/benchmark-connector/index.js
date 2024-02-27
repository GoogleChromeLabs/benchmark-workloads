// custom history events
function triggerEvent(element, name, state) {
    const event = new CustomEvent(name);
    event.name = name;
    event.state = state;
    element.dispatchEvent(event);
}

const pushState = history.pushState;
history.pushState = function(state) {
    const fn = pushState.apply(history, arguments);
    triggerEvent(window, "pushstate", state);
    triggerEvent(window, "statechange", state);
    return fn;
};

const replaceState = history.replaceState;
history.replaceState = function(state) {
    const fn = replaceState.apply(history, arguments);
    triggerEvent(window, "replacestate", state);
    triggerEvent(window, "statechange", state);
    return fn;
};

window.addEventListener("popstate", function(event) {
    triggerEvent(window, "statechange", event.state);
});

// this should probably come from environment variable.
const appId = "222";

window.onmessage = async (event) => {
    // ensure we only let legit functions run...
    if (event.data.id !== appId || event.data.type !== "benchmark-connector")
        return;

    const { name } = event.data;

    const testFunction = new Function(`return ${ event.data.fn}`)();
    if (testFunction) {
        requestAnimationFrame(() => {
            performance.mark(`${name}-start`);
        });
        requestAnimationFrame(async () => {
            await testFunction();
            setTimeout(() => {
                performance.mark(`${name}-end`);
                performance.measure(`${name}`, { start: `${name}-start`, end: `${name}-end` });
                const result = JSON.stringify(performance.getEntriesByName(`${name}`)[0]);
                window.top.postMessage({ type: "test-completed", status: "success", result }, "*");
            }, 0);
        });
    }
};

window.top.postMessage({ type: "app-ready", status: "success", appId }, "*");
