import { apiUrl } from "./api";

export const addTeacher = async ({ name, age, subject, email, experience,password }) => {
  const response = await fetch(apiUrl("/api/teachers"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, age, email, subject, experience,password}),
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
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
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
    },
    credentials: "include",
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
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};
