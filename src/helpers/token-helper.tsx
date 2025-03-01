import { jwtDecode } from "jwt-decode";
import { User } from "../types";

export function getUserByToken(token: string): User | null {
    const decoded = jwtDecode(token);
    if(!decoded)
        return null;

    return decoded as User;
}