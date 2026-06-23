import { useState } from "react";
import type { AuthUser, JwtPayload } from "../shared/types/auth";
import { jwtDecode } from "jwt-decode";
import { toAuthUser } from "../api/auth";
import { AuthContext } from "./authContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const [user, setUser] = useState<AuthUser | null>(() => {

        if(!token) return null;

        const decoded = jwtDecode(token) as JwtPayload;
        return toAuthUser(decoded);
    });

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(toAuthUser(jwtDecode(newToken) as JwtPayload));
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

     return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;