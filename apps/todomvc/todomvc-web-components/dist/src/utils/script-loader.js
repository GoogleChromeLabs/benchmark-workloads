import { requestIdleCallback } from "./request-idle-callback.js";

function createScript({ type }) {
    const scriptEl = document.createElement("script");
    if (type !== "") scriptEl.type = type;
    return scriptEl;
}

function addScript({ scriptEl, location }) {
    if (location === "head") {
        document.head.appendChild(scriptEl);
    } else {
        document.body.appendChild(scriptEl);
    }
}

function buildScript({ scriptEl, code }) {
    scriptEl.textContent = code;
}

function initScript({ scriptEl, url, strategy }) {
    return new Promise((resolve, reject) => {
        scriptEl.onload = () => resolve();
        scriptEl.onerror = (e) => reject(e);

        switch (strategy) {
            case "lazyOnLoad":
                requestIdleCallback(() => scriptEl.setAttribute("src", url));
                break;
            default:
                scriptEl.setAttribute("src", url);
        }
    });
}

export async function loadScript({
    url = "",
    code = "",
    type = "",
    strategy = "default",
    location = "body",
} = {}) {
    // create a script element
    const scriptEl = createScript({ type });

    // add script to document
    addScript({ scriptEl, location });

    if (code !== "") {
        // add inline code to script element
        buildScript({ scriptEl, code });
    } else {
        // load external url
        await initScript({ scriptEl, url, strategy });
    }
}
