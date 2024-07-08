import { useState, useCallback } from "react";

export const useLocalStorage = (key, initialValue) => {
    if (!key)
        throw new Error("A valid key should be provided to useLocalStorage.");

    const readValue = () => {
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
    };

    const [storedValue, setStoredValue] = useState(readValue());

    const setValue = useCallback(
        (value) => {
            /* istanbul ignore next */
            if (typeof window === "undefined")
                console.warn(`Tried setting localStorage value for key "${key}"`);

            try {
                window.localStorage.setItem(key, JSON.stringify(value));
                setStoredValue(value);
            } catch (error) {
                console.warn(`Error writing localStorage to "${key}": `, error);
            }
        },
        [key, setStoredValue]
    );

    return [storedValue, setValue];
};
