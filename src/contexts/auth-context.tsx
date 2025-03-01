import { createContext, useContext, useState } from "react";
import { User } from "../types";
import { getUserByToken } from "../helpers/token-helper";
import { LOCAL_STORAGE_TOKEN_NAME } from "../constanst";

export type AuthContextProps = {
    user: User | null;
    setAuth: (token: string | null) => void;
    getToken: () => Promise<string | null>;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    async function setAuth(token: string | null) {
        if (!token) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setUser(null);
            return;
        }

        var user = getUserByToken(token);
        if (!user) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setUser(null);
            return;
        }

        setUser(user);
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
    }

    async function getToken() {
        return localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    }

    return (
        <AuthContext.Provider value={{ user, setAuth, getToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);