const throttle = (func, wait) => {
    let lastCall = 0;
    return function (...args) {
        const current = Date.now();
        if (current - lastCall >= wait) {
            const result = func.apply(this, args);
            lastCall = current;
            return result;
        }
    };
};

function opThrottle(fn, delay, { leading = false, trailing = true } = {}) {
    let last = 0;
    let timer = null;
    return function () {
        const now = +new Date();
        if (!last && leading === false) {
            last = now;
        }
        if (now - last > delay) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(this, arguments);
            last = now;
        } else if (!timer && trailing !== false) {
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                last = +new Date();
                timer = null;
            }, delay);
        }
    };
}