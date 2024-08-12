import { requestIdleCallback } from "./request-idle-callback.js";

function createScript(type) {
    return new Promise((resolve) => {
        const scriptEl = document.createElement('script');
        if (type !== "") scriptEl.type = type;
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
      scriptEl.onload = () => resolve({success: true, type: "initScript"});
      scriptEl.onerror = () => reject({success: false, type: "initScript"});

      switch(strategy) {
        case "lazyOnLoad":
            requestIdleCallback(() => scriptEl.setAttribute('src', url));
            break;
        default:
            scriptEl.setAttribute('src', url);
      }
    });
}

function buildScript(scriptEl, code) {
    return new Promise((resolve) => {
        scriptEl.textContent = code;
        return resolve({ success: true, type: "buildScript"});
    });
}

export async function loadScript({ url, code = "", type = "", strategy = "default", location, onError, onSuccess } = {}) {
    // create a script element
    const { scriptEl } = await createScript(type);

    // add script to document
    await addScript(scriptEl, location);

    if (code !== "") {
        // add inline code to script element
        await buildScript(scriptEl, code).then(() => onSuccess?.()).catch(() => onError?.());
    } else {
        // load external url
        await initScript(scriptEl, url, strategy).then(() => onSuccess?.()).catch(() => onError?.());
    }

    return ({ success: true, type: "loadScript", id});
}
