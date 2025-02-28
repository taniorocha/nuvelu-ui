import { createContext, useContext, useState } from "react";
import { User } from "../types";

export type AuthContextProps = {
    user: User | null;
    setAuth: (authUser: User | null) => void;
    getToken: () => Promise<string | null>;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    async function setAuth(authUser: User | null) {
        if (!authUser) {
            localStorage.removeItem("token");
            setUser(null);
            return;
        }

        setUser(authUser);
        localStorage.setItem('token', `${authUser?.username}%%${authUser?.password}`);
    }

    async function getToken() {
        return localStorage.getItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, setAuth, getToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);