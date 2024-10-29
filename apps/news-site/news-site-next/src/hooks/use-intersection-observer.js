import { useRef, useEffect } from "react";

export function useIntersectionObserver( { callback }) {
    const elementRef = useRef(undefined);
    const intersectionObserver = useRef(undefined);

    useEffect(
        function() {
            const element = elementRef.current;
            intersectionObserver.current = new IntersectionObserver(callback);
            intersectionObserver.current.observe(element);

            return function () {
                if (intersectionObserver.current)
                    intersectionObserver.current.unobserve(element);

            };
        }, [elementRef]
    );

    function disconnect() {
        if (intersectionObserver.current)
            intersectionObserver.current.disconnect();
    }

    return { elementRef, disconnect };
}
