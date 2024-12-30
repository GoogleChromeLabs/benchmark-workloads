export const requestIdleCallback = window.requestIdleCallback =
    window.requestIdleCallback ||
    function (cb) {
        const start = Date.now();
        const timeoutId = window.setTimeout(function () {
            cb({
                didTimeout: false,
                timeRemaining() {
                    return Math.max(0, 50 - (Date.now() - start));
                }
            });
        }, 1)

        return timeoutId;
    }

export const cancelIdleCallback = window.cancelIdleCallback || window.clearTimeout.bind(window);
