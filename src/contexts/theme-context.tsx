import { createContext, useContext, useState } from "react";
import { LOCAL_STORAGE_THEME_NAME } from "../constanst";

export type AuthContextProps = {
    getTheme: () => string;
    setTheme: (value: string) => void;
}

const ThemeContext = createContext({} as AuthContextProps);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    function getTheme() {
        const theme = localStorage.getItem(LOCAL_STORAGE_THEME_NAME) ?? 'light';
        if(!isThemeValid(theme))
            return "light";
        
        return theme;
    }

    function setTheme(value: string) {
        if(!isThemeValid(value))
            value = "light";
        
        localStorage.setItem(LOCAL_STORAGE_THEME_NAME, value);
    }

    function isThemeValid(value: string) {
        return value === "light" || value === "dark";
    }

    return (
        <ThemeContext.Provider value={{ getTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);