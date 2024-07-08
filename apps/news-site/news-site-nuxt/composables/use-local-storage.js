import { ref } from "vue";

export function useLocalStorage(key, initialValue) {
    if (!key)
        throw new Error("A valid key should be provided to useLocalStorage.");

    function readValue() {
        /* istanbul ignore if */
        if (typeof window === "undefined")
            return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            if (item)
                return JSON.parse(item);

            window.localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage from "${key}": `, error);
            return initialValue;
        }
    }

    const storedValue = ref(readValue());

    function setValue(value) {
        /* istanbul ignore next */
        if (typeof window === "undefined")
            console.warn(`Tried setting localStorage value for key "${key}"`);

        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            storedValue.value = value;
        } catch (error) {
            console.warn(`Error writing localStorage to "${key}": `, error);
        }
    }

    return [storedValue.value, setValue];
}
