import { useState } from "react";

export const useLocalStorage = (key: string, initialValue?: string) => {
    const [value, setValue] = useState<string | undefined>(
        (localStorage.getItem(key) as string) ?? initialValue
    );

    const setItem = (value: string) => {
        localStorage.setItem(key, value);
        setValue(value);
    };

    const getItem = () => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    const removeItem = () => {
        localStorage.removeItem(key);
        setValue(undefined);
    };

    return { value, setItem, getItem, removeItem };
};
