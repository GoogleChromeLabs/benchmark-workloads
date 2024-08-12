import { requestIdleCallback } from "./request-idle-callback.js";

function createScript(type) {
    return new Promise((resolve) => {
        const scriptEl = document.createElement('script');
        scriptEl.type = type;
        return resolve({ success: true, type: "createScript", scriptEl});
    });
}

function addScript(scriptEl, location) {
    return new Promise((resolve) => {
        if (location === 'head') {
            document.head.appendChild(scriptEl);
        } else {
            document.body.appendChild(scriptEl);
        }
        return resolve({ success: true, type: "addScript"});
    });
}

function initScript(scriptEl, url, strategy) {
    return new Promise((resolve, reject) => {
      scriptEl.onload = () => resolve({success: true, type: "loadScript"});
      scriptEl.onerror = () => reject({success: false, type: "loadScript"});

      switch(strategy) {
        case "lazyOnLoad":
            requestIdleCallback(() => scriptEl.setAttribute('src', url));
            break;
        default:
            scriptEl.setAttribute('src', url);
      }
    });
}

export async function loadScript({ url, type, strategy, location, onError, onSuccess } = {}) {
    const { scriptEl } = await createScript(type)
    await addScript(scriptEl, location);
    await initScript(scriptEl, url, strategy).then(() => onSuccess?.()).catch(() => onError?.());
}
