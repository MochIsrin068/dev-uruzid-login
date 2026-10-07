import { API_URL } from "../constants/config";
import { TLoginPayload, LoginResponse } from "../types/auth";

export const AuthLogin = async (payload: TLoginPayload): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/authV5`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Login failed");
    }

    return data as LoginResponse;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};