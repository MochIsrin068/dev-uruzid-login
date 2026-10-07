"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AuthState, UserData, UserPrivilege, AppConfig } from "@/types/auth";
import Cookies from "js-cookie";

interface AuthContextType extends AuthState {
  setAuth: (state: Partial<AuthState>) => void;
  login: (response: { user: UserData; privileges: UserPrivilege[]; config: AppConfig[]; token: string }) => void;
  logout: () => void;
  hasPrivilege: (privilege: string) => boolean;
  isConfigEnabled: (configId: string) => boolean;
  getConfigValue: (configId: string) => string | undefined;
}

const initialState: AuthState = {
  user: null,
  privileges: [],
  config: [],
  token: null,
  isAuthenticated: false,
};

function loadInitialState(): AuthState {
  if (typeof window === "undefined") return initialState;

  const storedToken = localStorage.getItem("auth_token");
  const storedUser = localStorage.getItem("auth_user");
  const storedPrivileges = localStorage.getItem("auth_privileges");
  const storedConfig = localStorage.getItem("auth_config");

  if (storedToken && storedUser) {
    try {
      return {
        token: storedToken,
        user: storedUser ? JSON.parse(storedUser) : null,
        privileges: storedPrivileges ? JSON.parse(storedPrivileges) : [],
        config: storedConfig ? JSON.parse(storedConfig) : [],
        isAuthenticated: true,
      };
    } catch {
      return initialState;
    }
  }

  return initialState;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(loadInitialState);

  const setAuth = (partialState: Partial<AuthState>) => {
    setState((prev) => {
      const newState = { ...prev, ...partialState };
      if (typeof window !== "undefined") {
        if (newState.token) localStorage.setItem("auth_token", newState.token);
        else localStorage.removeItem("auth_token");
        if (newState.user) localStorage.setItem("auth_user", JSON.stringify(newState.user));
        else localStorage.removeItem("auth_user");
        localStorage.setItem("auth_privileges", JSON.stringify(newState.privileges));
        localStorage.setItem("auth_config", JSON.stringify(newState.config));
      }
      return newState;
    });
  };

  const login = ({
    user,
    privileges,
    config,
    token,
  }: {
    user: UserData;
    privileges: UserPrivilege[];
    config: AppConfig[];
    token: string;
  }) => {
    setAuth({
      user,
      privileges,
      config,
      token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuth(initialState);
    Cookies.remove("auth_token");
  };

  const hasPrivilege = (privilege: string): boolean => {
    return state.privileges.some(
      (item) => item.active === 1 && item.priviledge === privilege,
    );
  };

  const isConfigEnabled = (configId: string): boolean => {
    const config = state.config.find((c) => c.id === configId);
    if (!config) return false;
    return config.onoff === 1 && config.value === "1";
  };

  const getConfigValue = (configId: string): string | undefined => {
    const config = state.config.find((c) => c.id === configId);
    return config?.value;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setAuth,
        login,
        logout,
        hasPrivilege,
        isConfigEnabled,
        getConfigValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}