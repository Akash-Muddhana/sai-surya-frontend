import { apiUrl } from "./api";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};
export const addStudent = async ({
  name,
  rollNumber,
  classValue,
  village,
  attendance,
  parentName,
  parentPhone,
  parentEmail,
  address,
}) => {
  const response = await fetch(apiUrl("/api/students/add"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({
      name,
      rollNumber,
      classValue,
      village,
      attendance,
      parentName,
      parentPhone,
      parentEmail,
      address,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};
export const getStudent = async ({ standard, roll }) => {
  const response = await fetch(apiUrl("/api/students"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ standard, roll }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

export const addStudentMarks = async ({
  studentId,
  standard,
  roll,
  examClass,
  examType,
  academicYear,
  marks,
}) => {
  const response = await fetch(apiUrl("/api/students/addMarks"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({
      studentId,
      standard,
      roll,
      examClass,
      examType,
      academicYear,
      marks,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

export const getStudentMarks = async ({
  studentId,
  standard,
  roll,
  examClass,
  examType,
  academicYear,
}) => {
  const response = await fetch(apiUrl("/api/students/marks"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({
      studentId,
      standard,
      roll,
      examClass,
      examType,
      academicYear,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

export const markStudentAttendance = async ({ standard, date, records }) => {
  const response = await fetch(apiUrl("/api/students/attendance"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ standard, date, records }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

export const getAttendanceDay = async ({ standard, date }) => {
  const response = await fetch(apiUrl("/api/students/attendance/day"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ standard, date }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

export const markAttendanceHoliday = async ({ standard, date, reason }) => {
  const response = await fetch(apiUrl("/api/students/attendance/holiday"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ standard, date, reason }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

export const removeAttendanceHoliday = async ({ standard, date }) => {
  const response = await fetch(
    apiUrl("/api/students/attendance/remove-holiday"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ standard, date }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};
