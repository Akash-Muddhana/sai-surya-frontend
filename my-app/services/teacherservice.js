import { apiUrl } from "./api";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const addTeacher = async ({
  name,
  age,
  subject,
  email,
  experience,
  password,
}) => {
  const response = await fetch(apiUrl("/api/teachers"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ name, age, email, subject, experience, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};
export const getTeacher = async () => {
  const response = await fetch(apiUrl("/api/teachers"), {
    method: "GET",
    headers: getAuthHeader(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};
export const updateTeacher = async (id, updatedData) => {
  const response = await fetch(apiUrl(`/api/teachers/${id}`), {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(updatedData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};
export const deleteTeacher = async (id) => {
  const response = await fetch(apiUrl(`/api/teachers/${id}`), {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};
