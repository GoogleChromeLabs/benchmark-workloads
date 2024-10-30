import { ref, watch } from "vue";

export function useIntersectionObserver({ callback }) {
    const elementRef = ref(undefined);
    const intersectionObserver = ref(undefined);

    watch(() => elementRef, () => {
        if (!elementRef.value)
            return;

        const element = elementRef.value;
        intersectionObserver.value = new IntersectionObserver(callback);
        intersectionObserver.value.observe(element);

        // eslint-disable-next-line consistent-return
        return function () {
            if (intersectionObserver.value)
                intersectionObserver.value.unobserve(element);

        };
    }, { deep: true, immediate: true });

    function disconnect() {
        if (intersectionObserver.value)
            intersectionObserver.value.disconnect();
    }

    return { elementRef, disconnect };
}
