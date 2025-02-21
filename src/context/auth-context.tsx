"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  pets: object;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get("authToken")
    const savedUser = localStorage.getItem("user")

    if (savedToken) {
      setToken(savedToken)
    }

    // if user exist in local storage, set hook
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (userData: User, authToken: string) => {
    setUser(userData)
    setToken(authToken)
    Cookies.set("authToken", authToken)

    localStorage.setItem("user", JSON.stringify(userData))

    router.push("/dashboard");
  }

  const logout = () => {
    Cookies.remove("authToken")
    localStorage.removeItem("user")
    setUser(null)
    setToken(null)
    router.push("/login")
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access authentication context
export const useAuth = () =>  {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should be used inside AuthProvider")
  }

  return context;
}
