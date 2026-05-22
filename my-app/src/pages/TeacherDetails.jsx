import { useEffect, useState } from "react";
import {
  deleteTeacher,
  getTeacher,
  updateTeacher,
} from "../../services/teacherservice";

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
  book: (
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  briefcase: (
    <path
      d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1M3 9h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM9 13h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  edit: (
    <path
      d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  filter: (
    <path
      d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
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
  refresh: (
    <path
      d="M3 12a9 9 0 0 1 15.14-6.64L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.14 6.64L3 16M3 21v-5h5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  search: (
    <path
      d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  spark: (
    <path
      d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zM19 15l.9 2.6L22 18.5l-2.1.9L19 22l-.9-2.6-2.1-.9 2.1-.9L19 15zM5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  trash: (
    <path
      d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6"
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
  x: (
    <path
      d="M18 6 6 18M6 6l12 12"
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

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "T";

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-2xl bg-gray-50 px-4 py-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
      <Icon name={icon} className="h-4 w-4" />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-0.5 break-words text-sm font-bold text-gray-900">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

const FormField = ({
  label,
  icon,
  value,
  onChange,
  error,
  type = "text",
  className = "",
}) => (
  <label className={`block ${className}`}>
    <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
      <Icon name={icon} className="h-4 w-4 text-violet-500" />
      {label}
    </span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`mt-2 block w-full rounded-2xl border bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:ring-4 ${
        error
          ? "border-red-400 focus:border-red-400 focus:ring-red-100"
          : "border-gray-200 focus:border-violet-400 focus:ring-violet-100"
      }`}
    />
    {error && <p className="mt-1 text-xs font-bold text-red-600">{error}</p>}
  </label>
);

export function TeacherDetails({ isLoggedIn }) {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await getTeacher();
        const teacherData = response.data || response;
        setTeachers(Array.isArray(teacherData) ? teacherData : []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
        setError("Failed to load teachers");
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const handleEditClick = (teacher) => {
    if (!isLoggedIn) {
      setError("Please log in to edit teacher profiles");
      return;
    }

    setSelectedTeacher({
      ...teacher,
      name: String(teacher.name || ""),
      subject: String(teacher.subject || ""),
      age: String(teacher.age || ""),
      email: String(teacher.email || ""),
      experience: String(teacher.experience || ""),
    });
    setDeleteConfirm(false);
    setEditErrors({});
  };

  const validateEditForm = () => {
    const errors = {};
    const name = String(selectedTeacher.name || "").trim();
    const subject = String(selectedTeacher.subject || "").trim();
    const age = String(selectedTeacher.age || "").trim();
    const email = String(selectedTeacher.email || "").trim();
    const experience = String(selectedTeacher.experience || "").trim();

    if (!name) errors.name = "Name is required";
    else if (!/^[a-zA-Z\s]*$/.test(name)) {
      errors.name = "Name can only contain letters and spaces";
    }

    if (!subject) errors.subject = "Subject is required";
    if (!age) errors.age = "Age is required";
    else if (!/^\d{1,3}$/.test(age)) {
      errors.age = "Age must be a valid number";
    }

    if (!email) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!experience) errors.experience = "Experience is required";

    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async () => {
    if (!isLoggedIn) {
      setError("Please log in to update teacher profiles");
      return;
    }
    if (!validateEditForm()) return;

    try {
      setUpdating(true);
      const updateData = {
        ...selectedTeacher,
        age: String(selectedTeacher.age),
      };

      await updateTeacher(selectedTeacher._id, updateData);
      const response = await getTeacher();
      const teacherData = response.data || response;
      setTeachers(Array.isArray(teacherData) ? teacherData : []);
      setSelectedTeacher(null);
      setEditErrors({});
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update teacher");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!isLoggedIn) {
      setError("Please log in to delete teacher profiles");
      return;
    }
    if (!selectedTeacher?._id) return;

    try {
      setDeleting(true);
      await deleteTeacher(selectedTeacher._id);
      setTeachers((prev) => prev.filter((t) => t._id !== selectedTeacher._id));
      setSelectedTeacher(null);
      setDeleteConfirm(false);
      setError(null);
    } catch (err) {
      console.error("Delete failed:", err.message);
      setError("Failed to delete teacher");
    } finally {
      setDeleting(false);
    }
  };

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "History",
    "Geography",
    "PE",
  ];

  const filteredTeachers = teachers.filter((teacher) => {
    const name = String(teacher.name || "");
    const subject = String(teacher.subject || "");
    const matchSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSubject =
      filterSubject === "" ||
      subject.toLowerCase() === filterSubject.toLowerCase();

    return matchSearch && matchSubject;
  });

  const uniqueSubjects = new Set(
    teachers.map((teacher) => teacher.subject).filter(Boolean)
  ).size;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#faf5ff,#f5f3ff_48%,#ddd6fe)] px-4 py-10">
      <main className="mx-auto max-w-7xl">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 font-semibold text-red-700 shadow-lg shadow-red-100/50">
            <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-violet-200/40 backdrop-blur-sm">
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 p-6 text-white md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg ring-1 ring-white/30">
                  <Icon name="users" className="h-8 w-8" />
                </div>
                <p className="text-sm font-bold uppercase tracking-wide text-white/85">
                  Teacher Directory
                </p>
                <h1 className="mt-2 text-4xl font-black md:text-5xl">
                  Meet The Faculty
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 md:text-base">
                  Search, filter, and manage teacher profiles from one clean
                  dashboard.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/20 p-4 shadow-sm ring-1 ring-white/30">
                  <p className="text-xs font-bold uppercase text-white/80">
                    Total
                  </p>
                  <p className="mt-1 text-3xl font-black">{teachers.length}</p>
                </div>
                <div className="rounded-2xl bg-white/20 p-4 shadow-sm ring-1 ring-white/30">
                  <p className="text-xs font-bold uppercase text-white/80">
                    Shown
                  </p>
                  <p className="mt-1 text-3xl font-black">
                    {filteredTeachers.length}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/20 p-4 shadow-sm ring-1 ring-white/30">
                  <p className="text-xs font-bold uppercase text-white/80">
                    Subjects
                  </p>
                  <p className="mt-1 text-3xl font-black">{uniqueSubjects}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-b border-violet-100 bg-white/80 p-5 md:grid-cols-3 md:p-6">
            <label className="relative md:col-span-2">
              <Icon
                name="search"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500"
              />
              <input
                type="text"
                placeholder="Search by teacher name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </label>

            <label className="relative">
              <Icon
                name="filter"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500"
              />
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {loading ? (
          <div className="mt-6 flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-white/80 bg-white/90 p-8 text-center shadow-xl shadow-violet-200/30">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-500" />
            </div>
            <p className="mt-5 text-lg font-black text-gray-900">
              Loading teachers
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Fetching the latest teacher directory.
            </p>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="mt-6 flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-violet-200 bg-white/80 p-8 text-center shadow-xl shadow-violet-200/20">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
              <Icon name="search" className="h-10 w-10" />
            </div>
            <h2 className="mt-5 text-2xl font-black text-gray-950">
              No teachers found
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600">
              Try another name or switch the subject filter.
            </p>
          </div>
        ) : (
          <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredTeachers.map((teacher) => (
              <article
                key={teacher._id}
                className="group overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-xl shadow-violet-200/25 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-violet-800 p-5 text-white">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-xl font-black text-white ring-1 ring-white/30">
                      {initials(teacher.name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-black">
                        {teacher.name || "Unnamed Teacher"}
                      </h3>
                      <p className="mt-1 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/30">
                        {teacher.subject || "Subject not set"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <InfoRow icon="user" label="Age" value={teacher.age} />
                    <InfoRow
                      icon="briefcase"
                      label="Experience"
                      value={teacher.experience}
                    />
                  </div>
                  <InfoRow icon="mail" label="Email" value={teacher.email} />

                  <button
                    onClick={() => handleEditClick(teacher)}
                    disabled={!isLoggedIn}
                    className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-bold shadow-lg transition active:scale-[0.98] ${
                      isLoggedIn
                        ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-violet-200 hover:from-violet-600 hover:to-purple-600"
                        : "cursor-not-allowed bg-gray-200 text-gray-500 shadow-none"
                    }`}
                    title={isLoggedIn ? "Edit profile" : "Login to edit"}
                  >
                    <Icon name={isLoggedIn ? "edit" : "alert"} />
                    {isLoggedIn ? "Edit Profile" : "Login to Edit"}
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        {selectedTeacher && !deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
            <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
              <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 font-black text-white ring-1 ring-white/30">
                      {initials(selectedTeacher.name)}
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-white/85">
                        Edit Teacher
                      </p>
                      <h2 className="mt-1 text-2xl font-black">
                        {selectedTeacher.name || "Teacher Profile"}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTeacher(null)}
                    className="rounded-2xl p-2 text-white transition hover:bg-white/20"
                    aria-label="Close edit modal"
                  >
                    <Icon name="x" className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-2">
                <FormField
                  label="Full Name"
                  icon="user"
                  value={selectedTeacher.name}
                  error={editErrors.name}
                  onChange={(e) => {
                    setSelectedTeacher({
                      ...selectedTeacher,
                      name: e.target.value,
                    });
                    if (editErrors.name)
                      setEditErrors({ ...editErrors, name: null });
                  }}
                />
                <FormField
                  label="Subject"
                  icon="book"
                  value={selectedTeacher.subject}
                  error={editErrors.subject}
                  onChange={(e) => {
                    setSelectedTeacher({
                      ...selectedTeacher,
                      subject: e.target.value,
                    });
                    if (editErrors.subject)
                      setEditErrors({ ...editErrors, subject: null });
                  }}
                />
                <FormField
                  label="Age"
                  icon="user"
                  value={selectedTeacher.age}
                  error={editErrors.age}
                  onChange={(e) => {
                    setSelectedTeacher({
                      ...selectedTeacher,
                      age: e.target.value,
                    });
                    if (editErrors.age)
                      setEditErrors({ ...editErrors, age: null });
                  }}
                />
                <FormField
                  label="Email"
                  icon="mail"
                  type="email"
                  value={selectedTeacher.email}
                  error={editErrors.email}
                  onChange={(e) => {
                    setSelectedTeacher({
                      ...selectedTeacher,
                      email: e.target.value,
                    });
                    if (editErrors.email)
                      setEditErrors({ ...editErrors, email: null });
                  }}
                />
                <FormField
                  label="Experience"
                  icon="briefcase"
                  value={selectedTeacher.experience}
                  error={editErrors.experience}
                  className="md:col-span-2"
                  onChange={(e) => {
                    setSelectedTeacher({
                      ...selectedTeacher,
                      experience: e.target.value,
                    });
                    if (editErrors.experience)
                      setEditErrors({ ...editErrors, experience: null });
                  }}
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 p-6 sm:flex-row">
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setDeleteConfirm(true)}
                  disabled={!isLoggedIn}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Icon name="trash" />
                  Delete
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-3 font-bold text-white shadow-lg shadow-violet-200 transition hover:from-violet-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {updating ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                  ) : (
                    <Icon name="edit" />
                  )}
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteConfirm && selectedTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="bg-red-50 p-6 text-red-900">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 ring-1 ring-red-200">
                    <Icon name="alert" className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-red-600">
                      Confirm Delete
                    </p>
                    <h2 className="mt-1 text-2xl font-black">
                      Delete Teacher?
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-800">
                  You are about to permanently delete{" "}
                  <span className="font-black">{selectedTeacher.name}</span>{" "}
                  from the teacher directory. This action cannot be reversed.
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-bold text-white shadow-lg shadow-red-100 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {deleting ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                    ) : (
                      <Icon name="trash" />
                    )}
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
