import { apiUrl } from "./api";

export const login = async (email, password) => {
  const response = await fetch(apiUrl("/api/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  localStorage.setItem("token",data.token)
  return data;
};
export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    const authHeaders = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await fetch(apiUrl("/api/auth/logout"), {
      method: "POST",
      headers: authHeaders,
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    localStorage.removeItem("token");

    if (!response.ok) {
      console.error("Logout API error:", response.status, data);
      throw data || { message: "Logout failed" };
    }

    console.log("Logout successful:", data);
    return data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
export const teacherLogin = async (email, password) => {
  const response = await fetch(apiUrl("/api/auth/teacher"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  localStorage.setItem("token", data.token);
  return data;
};

