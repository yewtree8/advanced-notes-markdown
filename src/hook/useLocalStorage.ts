import { useEffect, useState } from "react";

/**
 * A more stable custom hook / implementation of 
 * using local storage for generic custom types.
 * @param key Identifier, as of now its a string (the title)
 * @param initialValue A function attached to the key.
 * @returns LocalStorageState custom hook for notes.
 */

export function useLocalStorage<T>(key: string,
     initialValue: T | (() => T)) {
    
    const [value, setValue] = useState<T>(() => {
        const json = localStorage.getItem(key);
        if(json == null) {
            //check init value
            if(typeof initialValue === "function") {
                return (initialValue as () => T)(); //return declared function with paramed type
            }
            return initialValue; //Return the type just in case.
        } else {
            return JSON.parse(json);
        }
    });

    // We'll analyse these for performance triggers.
    // But for now, generics and the key that are hooked will fire this hook
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key]);

    return [value, setValue] as [T, typeof setValue] //Assert return

}