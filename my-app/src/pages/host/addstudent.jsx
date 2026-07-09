import { useEffect, useState } from "react";
import axios from "axios";
import {
  addStudent,
  addStudentMarks,
} from "../../../services/studentservice";
import { apiUrl } from "../../../services/api";

const icons = {
  alert: (
    <path
      d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  arrow: (
    <path
      d="M5 12h14M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  book: (
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  chart: (
    <path
      d="M4 19V5M8 17v-6M13 17V7M18 17v-9M22 19H3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  check: (
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  hash: (
    <path
      d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
  home: (
    <path
      d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  mail: (
    <path
      d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  map: (
    <path
      d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  phone: (
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.63 2.59a2 2 0 0 1-.45 2.11L8 9.66a16 16 0 0 0 6.34 6.34l1.24-1.24a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.59.63A2 2 0 0 1 22 16.92z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  refresh: (
    <path
      d="M3 12a9 9 0 0 1 15.14-6.64L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.14 6.64L3 16M3 21v-5h5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  spark: (
    <path
      d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zM19 15l.9 2.6L22 18.5l-2.1.9L19 22l-.9-2.6-2.1-.9 2.1-.9L19 15z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  user: (
    <path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  users: (
    <path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

const Icon = ({ name, className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {icons[name]}
  </svg>
);

const Field = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  className = "",
}) => (
  <label className={`block ${className}`}>
    <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
      <Icon name={icon} className="h-4 w-4 text-violet-500" />
      {label}
    </span>
    <div className="relative mt-2">
      <Icon
        name={icon}
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500"
      />
      <input
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-2xl border bg-white px-12 py-3 font-semibold text-gray-900 outline-none transition focus:ring-4 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:border-violet-400 focus:ring-violet-100"
        }`}
      />
    </div>
    {error && (
      <p className="mt-2 flex items-center gap-2 text-xs font-bold text-red-600">
        <Icon name="alert" className="h-4 w-4" />
        {error}
      </p>
    )}
  </label>
);

const TextAreaField = ({ label, icon, value, onChange, placeholder }) => (
  <label className="block md:col-span-2">
    <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
      <Icon name={icon} className="h-4 w-4 text-violet-500" />
      {label}
      <span className="text-xs font-semibold text-gray-400">(Optional)</span>
    </span>
    <div className="relative mt-2">
      <Icon
        name={icon}
        className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-violet-500"
      />
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
        className="block w-full resize-none rounded-2xl border border-gray-200 bg-white px-12 py-3 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
      />
    </div>
  </label>
);

const DEFAULT_SUBJECTS = [
  "Telugu",
  "Hindi",
  "English",
  "Maths",
  "Science",
  "Social",
];

const EXAM_TYPES = [
  { value: "weekly", label: "Weekly Exam" },
  { value: "monthly", label: "Monthly Exam" },
  { value: "quarterly", label: "Quarterly Exam" },
  { value: "annual", label: "Annual Exam" },
  { value: "ct", label: "CT" },
];

const emptyMarks = () =>
  DEFAULT_SUBJECTS.reduce((marks, subject) => {
    marks[subject] = "";
    return marks;
  }, {});

const isDefaultSubject = (subject) => DEFAULT_SUBJECTS.includes(subject);

export function AddStudent() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [classValue, setClassValue] = useState("");
  const [village, setVillage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [address, setAddress] = useState("");
  const [marks, setMarks] = useState(emptyMarks);
  const [examClass, setExamClass] = useState("");
  const [examType, setExamType] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoggedIn, setIsLoggedInLocal] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const authHeaders = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
        const [hostAuth, teacherAuth] = await Promise.all([
          axios.get(apiUrl("/api/auth"), authHeaders),
          axios.get(apiUrl("/api/auth/teacher"), authHeaders),
        ]);
        const isHost = hostAuth.data?.isLoggedIn === true;
        const isTeacher = teacherAuth.data?.isTeacherLoggedIn === true;
        setIsLoggedInLocal(isHost || isTeacher);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsLoggedInLocal(false);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  const clearError = (field) => {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const resetForm = () => {
    setName("");
    setRollNumber("");
    setClassValue("");
    setVillage("");
    setAttendance("");
    setParentName("");
    setParentPhone("");
    setParentEmail("");
    setAddress("");
    setMarks(emptyMarks());
    setExamClass("");
    setExamType("");
    setNewSubject("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    else if (!/^[a-zA-Z\s]*$/.test(name)) {
      newErrors.name = "Name can only contain letters";
    }

    if (!rollNumber.trim()) newErrors.rollNumber = "Roll number is required";
    else if (!/^\d+$/.test(rollNumber)) {
      newErrors.rollNumber = "Roll number must be numeric";
    }

    if (!classValue.trim()) newErrors.classValue = "Class is required";
    if (!village.trim()) newErrors.village = "Village is required";

    if (!attendance.trim()) newErrors.attendance = "Attendance is required";
    else if (!/^\d{1,3}$/.test(attendance) || parseInt(attendance, 10) > 100) {
      newErrors.attendance = "Enter valid percentage (0-100)";
    }

    if (!parentName.trim()) newErrors.parentName = "Parent name is required";
    if (!parentPhone.trim()) newErrors.parentPhone = "Parent phone is required";
    else if (!/^\d{10}$/.test(parentPhone)) {
      newErrors.parentPhone = "Phone must be 10 digits";
    }

    if (parentEmail.trim() && !/^\S+@\S+\.\S+$/.test(parentEmail)) {
      newErrors.parentEmail = "Enter valid email";
    }

    const hasMarks = Object.values(marks).some((value) => String(value).trim());
    if (hasMarks && !examClass.trim()) {
      newErrors.examClass = "Marks class is required";
    }
    if (hasMarks && !examType.trim()) {
      newErrors.examType = "Exam type is required";
    }

    Object.entries(marks).forEach(([subject, value]) => {
      if (!String(value).trim()) return;
      const mark = Number(value);
      if (!Number.isFinite(mark) || mark < 0 || mark > 100) {
        newErrors[`marks.${subject}`] = "Enter 0-100";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateMark = (subject, value) => {
    if (!/^\d{0,3}$/.test(value)) return;
    setMarks((prev) => ({
      ...prev,
      [subject]: value,
    }));
    clearError(`marks.${subject}`);
  };

  const addCustomSubject = () => {
    const subject = newSubject.trim();
    if (!subject || marks[subject] !== undefined) return;

    setMarks((prev) => ({
      ...prev,
      [subject]: "",
    }));
    setNewSubject("");
  };

  const removeCustomSubject = (subject) => {
    if (isDefaultSubject(subject)) return;

    setMarks((prev) => {
      const next = { ...prev };
      delete next[subject];
      return next;
    });
    clearError(`marks.${subject}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setSaved(false);
      const result = await addStudent({
        name,
        rollNumber,
        classValue,
        village,
        attendance,
        parentName,
        parentPhone,
        parentEmail,
        address,
      });
      const normalizedMarks = Object.entries(marks).reduce(
        (next, [subject, value]) => {
          if (String(value).trim()) next[subject] = Number(value);
          return next;
        },
        {},
      );

      if (Object.keys(normalizedMarks).length > 0) {
        await addStudentMarks({
          studentId: result.data?._id,
          standard: classValue,
          roll: rollNumber,
          examClass,
          examType,
          marks: normalizedMarks,
        });
      }
      setSaved(true);
      resetForm();
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      console.error("Failed to add student:", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#faf5ff,#f5f3ff_48%,#ddd6fe)] px-4 py-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/90 shadow-xl shadow-violet-200/40">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-500" />
        </div>
        <p className="font-bold text-gray-700">Checking authentication...</p>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#faf5ff,#f5f3ff_48%,#ddd6fe)] px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white/90 p-8 text-center shadow-2xl shadow-violet-200/40">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
            <Icon name="alert" className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-2xl font-black text-gray-950">
            Login Required
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Please log in to register students.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#faf5ff,#f5f3ff_48%,#ddd6fe)] px-4 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[390px_1fr]">
        <section className="overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-2xl shadow-violet-200/40">
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 p-6 text-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
              <Icon name="spark" className="h-8 w-8" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-white/85">
              Student Registration
            </p>
            <h1 className="mt-2 text-4xl font-black">Add Student</h1>
            <p className="mt-3 text-sm leading-6 text-white/90">
              Register a student profile with academic, parent, and contact
              details.
            </p>
          </div>

          <div className="space-y-4 p-6">
            <div className="rounded-2xl bg-violet-50 p-4 ring-1 ring-violet-100">
              <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
                Status
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    saved
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-white text-violet-600"
                  }`}
                >
                  <Icon name={saved ? "check" : "spark"} />
                </span>
                <div>
                  <p className="font-black text-gray-950">
                    {saved ? "Saved Successfully" : "Draft Profile"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {saved
                      ? "The student has been registered."
                      : "Complete the required fields to save."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Required Details
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Student information and parent contact details are required.
                Address can be added when available.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl shadow-violet-200/40">
          <div className="mb-6 border-b border-violet-100 pb-5">
            <p className="text-sm font-bold uppercase tracking-wide text-violet-600">
              Student Form
            </p>
            <h2 className="mt-1 text-3xl font-black text-gray-950">
              Profile Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Icon name="user" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-950">
                    Student Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    Basic academic details for the student.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Full Name"
                  icon="user"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                  placeholder="e.g. Rajesh Kumar"
                  error={errors.name}
                />
                <Field
                  label="Roll Number"
                  icon="hash"
                  value={rollNumber}
                  onChange={(e) => {
                    setRollNumber(e.target.value);
                    clearError("rollNumber");
                  }}
                  placeholder="e.g. 25"
                  error={errors.rollNumber}
                />
                <Field
                  label="Class"
                  icon="book"
                  value={classValue}
                  onChange={(e) => {
                    setClassValue(e.target.value);
                    setExamClass(e.target.value);
                    clearError("classValue");
                  }}
                  placeholder="e.g. 10-A"
                  error={errors.classValue}
                />
                <Field
                  label="Village"
                  icon="map"
                  value={village}
                  onChange={(e) => {
                    setVillage(e.target.value);
                    clearError("village");
                  }}
                  placeholder="e.g. Nandgaon"
                  error={errors.village}
                />
                <Field
                  label="Attendance %"
                  icon="chart"
                  value={attendance}
                  onChange={(e) => {
                    setAttendance(e.target.value);
                    clearError("attendance");
                  }}
                  placeholder="e.g. 85"
                  error={errors.attendance}
                  className="md:col-span-2"
                />
              </div>
              <div className="mt-5 border-t border-blue-100 pt-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 ring-1 ring-violet-200">
                    <Icon name="chart" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-950">Marks</h4>
                    <p className="text-sm text-gray-600">
                      Optional marks for this student.
                    </p>
                  </div>
                </div>

                <div className="mb-5 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-bold text-gray-700">
                      Class Scored In
                    </span>
                    <input
                      value={examClass}
                      onChange={(e) => {
                        setExamClass(e.target.value);
                        clearError("examClass");
                      }}
                      placeholder="e.g. 5"
                      className={`mt-2 block w-full rounded-2xl border bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:ring-4 ${
                        errors.examClass
                          ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:border-violet-400 focus:ring-violet-100"
                      }`}
                    />
                    {errors.examClass && (
                      <p className="mt-2 text-xs font-bold text-red-600">
                        {errors.examClass}
                      </p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-gray-700">
                      Exam Type
                    </span>
                    <select
                      value={examType}
                      onChange={(e) => {
                        setExamType(e.target.value);
                        clearError("examType");
                      }}
                      className={`mt-2 block w-full appearance-none rounded-2xl border bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:ring-4 ${
                        errors.examType
                          ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:border-violet-400 focus:ring-violet-100"
                      }`}
                    >
                      <option value="">Choose exam type</option>
                      {EXAM_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.examType && (
                      <p className="mt-2 text-xs font-bold text-red-600">
                        {errors.examType}
                      </p>
                    )}
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.keys(marks).map((subject) => (
                    <div key={subject}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-bold text-gray-700">
                          {subject}
                        </span>
                        {!isDefaultSubject(subject) && (
                          <button
                            type="button"
                            onClick={() => removeCustomSubject(subject)}
                            className="rounded-lg px-2 py-1 text-xs font-black text-red-600 transition hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={marks[subject]}
                        onChange={(e) => updateMark(subject, e.target.value)}
                        placeholder="0-100"
                        className={`mt-2 block w-full rounded-2xl border bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:ring-4 ${
                          errors[`marks.${subject}`]
                            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-violet-400 focus:ring-violet-100"
                        }`}
                      />
                      {errors[`marks.${subject}`] && (
                        <p className="mt-2 text-xs font-bold text-red-600">
                          {errors[`marks.${subject}`]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-violet-100 bg-white p-4 sm:flex-row">
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomSubject();
                      }
                    }}
                    placeholder="Add another subject"
                    className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                  <button
                    type="button"
                    onClick={addCustomSubject}
                    disabled={!newSubject.trim() || marks[newSubject.trim()] !== undefined}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:bg-violet-200"
                  >
                    Add Subject
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-100 bg-rose-50/60 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                  <Icon name="users" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-950">
                    Parent / Guardian Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    Contact details for communication and records.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Parent Name"
                  icon="user"
                  value={parentName}
                  onChange={(e) => {
                    setParentName(e.target.value);
                    clearError("parentName");
                  }}
                  placeholder="e.g. Mr. Sharma"
                  error={errors.parentName}
                />
                <Field
                  label="Phone Number"
                  icon="phone"
                  value={parentPhone}
                  onChange={(e) => {
                    setParentPhone(e.target.value);
                    clearError("parentPhone");
                  }}
                  placeholder="e.g. 9876543210"
                  error={errors.parentPhone}
                />
                <Field
                  label="Email Address"
                  icon="mail"
                  type="email"
                  value={parentEmail}
                  onChange={(e) => {
                    setParentEmail(e.target.value);
                    clearError("parentEmail");
                  }}
                  placeholder="e.g. parent@example.com"
                  error={errors.parentEmail}
                  className="md:col-span-2"
                />
                <TextAreaField
                  label="Address"
                  icon="home"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 123 Main Street, Downtown"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-violet-100 pt-6 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold text-white shadow-lg transition active:scale-[0.98] ${
                  loading
                    ? "cursor-not-allowed bg-violet-300 shadow-none"
                    : "bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200 hover:from-violet-600 hover:to-purple-600"
                }`}
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                ) : (
                  <Icon name="arrow" />
                )}
                {loading ? "Saving..." : "Register Student"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
              >
                <Icon name="refresh" />
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
