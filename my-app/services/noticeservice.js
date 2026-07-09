import { apiUrl } from "./api";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const addNotice = async (notice) => {
  const response = await fetch(apiUrl("/api/notice"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },

    body: JSON.stringify({ notice }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};
export const getNotice = async () => {
  const response = await fetch(apiUrl("/api/notice"), {
    method: "GET",
    headers: getAuthHeader(),
  });
  let data;
  try {
    data = await response.json();
  } catch {
    data = { message: "Invalid server response" };
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch notices");
  }

  return data;
};
