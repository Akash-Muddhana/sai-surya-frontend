const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://sai-surya-backend-r1ru.vercel.app";

export const apiUrl = (path) =>
  `${API_BASE_URL.replace(/\/$/, "")}${path}`;
