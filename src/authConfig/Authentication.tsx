import React, { createContext, FC, ReactNode, useState } from "react";
import { Buffer } from "buffer";

type Token = string | null | undefined;

type AuthContextProps = {
    token: Token;
    saveToken: undefined | ((userToken?: Token) => void);
};

const parseJwtData = (token: Token, field?: string): string[] | string | null => {
    if (!token) return null;

    const data = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

    if (typeof field === "undefined") return data;
    return data[field];
};

const getUserEmail = (token:Token)=>{
    return parseJwtData(token, "sub");
}

const AuthContext = createContext<AuthContextProps>({ token: undefined, saveToken: undefined });

const Authentication: FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | undefined | null>(sessionStorage.getItem("token"));

    const saveToken = (userToken?: Token): void => {
        if (userToken) {
            sessionStorage.setItem("token", userToken);
            setToken(userToken);
        } else {
            sessionStorage.removeItem("token");
            setToken(undefined);
        }
    };

    return <AuthContext.Provider value={{ token: token, saveToken: saveToken }}>{children}</AuthContext.Provider>;
};

const isLoggedIn = (token: Token): boolean => {
    return !!token;
};

export default Authentication;
export { AuthContext, isLoggedIn, getUserEmail};