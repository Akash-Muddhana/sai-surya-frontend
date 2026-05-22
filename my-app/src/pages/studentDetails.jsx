import { useState } from "react";
import { Link } from "react-router-dom";
import { getStudent } from "../../services/studentservice";

const icons = {
  search: (
    <path
      d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
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
  book: (
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"
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
  map: (
    <path
      d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
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
  phone: (
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.63 2.59a2 2 0 0 1-.45 2.11L8 9.66a16 16 0 0 0 6.34 6.34l1.24-1.24a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.59.63A2 2 0 0 1 22 16.92z"
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
  home: (
    <path
      d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"
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
  alert: (
    <path
      d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"
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

const EXAM_TYPE_LABELS = {
  weekly: "Weekly Exam",
  monthly: "Monthly Exam",
  quarterly: "Quarterly Exam",
  annual: "Annual Exam",
  ct: "CT",
};

const Field = ({ label, value, icon, tone = "violet" }) => {
  const tones = {
    violet: "bg-violet-50 text-violet-700 ring-violet-100",
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    rose: "bg-rose-50 text-rose-700 ring-rose-100",
  };

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${tones[tone]}`}
        >
          <Icon name={icon} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            {label}
          </p>
          <p className="mt-1 break-words text-base font-bold text-gray-900">
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

const MarksPanel = ({ marks, meta }) => {
  const entries = Object.entries(marks || {});

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/70 px-4 py-3 text-sm font-semibold text-violet-800">
        No subject marks added yet.
      </div>
    );
  }

  const total = entries.reduce((sum, [, value]) => sum + Number(value || 0), 0);
  const average = Math.round(total / entries.length);

  return (
    <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
            Subject Marks
          </p>
          <p className="text-sm font-semibold text-gray-600">
            Total {total} / Average {average}%
          </p>
          {(meta?.examClass || meta?.examType) && (
            <p className="mt-1 text-sm font-bold text-gray-700">
              {meta?.examClass ? `Class ${meta.examClass}` : ""}
              {(meta?.examClass && (meta?.academicYear || meta?.examType)) ? " / " : ""}
              {meta?.academicYear || ""}
              {meta?.academicYear && meta?.examType ? " / " : ""}
              {meta?.examType
                ? EXAM_TYPE_LABELS[meta.examType] || meta.examType
                : ""}
            </p>
          )}
        </div>
        <div className="rounded-xl bg-white px-3 py-2 text-sm font-black text-gray-900 ring-1 ring-violet-100">
          {entries.length} subjects
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([subject, mark]) => (
          <div
            key={subject}
            className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-violet-100"
          >
            <span className="min-w-0 truncate font-bold text-gray-800">
              {subject}
            </span>
            <span className="shrink-0 text-lg font-black text-violet-700">
              {mark}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function StudentDetails({
  isLoggedIn = false,
  isTeacherLoggedIn = false,
}) {
  const [standard, setStandard] = useState("");
  const [roll, setRoll] = useState("");
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const canFetchAllStudents = isLoggedIn || isTeacherLoggedIn;
  const isRollValid = roll === "" ? true : /^\d+$/.test(roll);
  const students = Array.isArray(student) ? student : student ? [student] : [];

  const handleShow = async (e) => {
    e.preventDefault();
    const searchedRoll = roll.trim();
    if (!standard || !isRollValid || (!canFetchAllStudents && !searchedRoll)) {
      return;
    }

    try {
      setLoading(true);
      setStudent(null);
      setError("");

      const result = await getStudent({
        standard,
        roll: canFetchAllStudents ? searchedRoll : roll,
      });
      setStudent(result?.data || result);
    } catch (err) {
      setError(err?.message || "Unable to fetch student details");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setStandard("");
    setRoll("");
    setStudent(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#faf5ff,#f5f3ff_48%,#ddd6fe)] px-4 py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[390px_1fr]">
        <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 shadow-2xl shadow-violet-200/40 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-violet-100/70" />

          <div className="relative mb-7">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-200">
              <Icon name="search" className="h-7 w-7" />
            </div>
            <p className="text-sm font-bold uppercase tracking-wide text-violet-600">
              Student Lookup
            </p>
            <h1 className="mt-1 text-3xl font-black text-gray-950">
              Find Student Details
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {canFetchAllStudents
                ? "Enter the standard to fetch all students, or add a roll number to fetch one student."
                : "Enter the class and roll number to fetch the saved student record."}
            </p>
          </div>

          <form onSubmit={handleShow} className="relative grid gap-4">
            <label className="block">
              <span className="text-sm font-bold text-gray-700">Standard</span>
              <div className="relative mt-2">
                <Icon
                  name="book"
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500"
                />
                <select
                  value={standard}
                  onChange={(e) => {
                    setStandard(e.target.value);
                    setError("");
                  }}
                  className="block w-full appearance-none rounded-2xl border border-gray-200 bg-white px-11 py-3 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                >
                  <option value="">Choose standard</option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      Standard {n}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-bold text-gray-700">
                Roll Number
                {canFetchAllStudents && (
                  <span className="ml-2 text-xs font-semibold text-gray-400">
                    (Optional)
                  </span>
                )}
              </span>
              <div className="relative mt-2">
                <Icon
                  name="hash"
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500"
                />
                <input
                  value={roll}
                  placeholder={
                    canFetchAllStudents
                      ? "Leave empty to show all students"
                      : "Enter roll number"
                  }
                  onChange={(e) => {
                    setRoll(e.target.value);
                    setError("");
                  }}
                  className={`block w-full rounded-2xl border bg-white px-11 py-3 font-semibold text-gray-900 outline-none transition focus:ring-4 ${
                    roll && !isRollValid
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-violet-400 focus:ring-violet-100"
                  }`}
                />
              </div>
              {roll && !isRollValid && (
                <p className="mt-2 flex items-center gap-2 text-xs font-bold text-red-600">
                  <Icon name="alert" className="h-4 w-4" />
                  Roll number must be numeric.
                </p>
              )}
            </label>

            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                disabled={
                  loading ||
                  !standard ||
                  !isRollValid ||
                  (!canFetchAllStudents && !roll)
                }
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 font-bold text-white shadow-lg transition ${
                  loading ||
                  !standard ||
                  !isRollValid ||
                  (!canFetchAllStudents && !roll)
                    ? "cursor-not-allowed bg-violet-300 shadow-none"
                    : "bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200 hover:from-violet-600 hover:to-purple-600 active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                ) : (
                  <Icon name="search" className="h-5 w-5" />
                )}
                {loading
                  ? "Fetching..."
                  : canFetchAllStudents && !roll.trim()
                    ? "Show Students"
                    : "Show Details"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
              >
                <Icon name="refresh" className="h-5 w-5" />
                Clear
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-violet-200/40 backdrop-blur-sm">
          {loading ? (
            <div className="flex min-h-[470px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-500" />
              </div>
              <p className="mt-5 text-lg font-black text-gray-900">
                Fetching student record
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Please wait while the details are loaded.
              </p>
            </div>
          ) : students.length > 0 ? (
            <div>
              <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-violet-800 p-6 text-white">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                      <Icon name="user" className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-violet-200">
                        {students.length === 1
                          ? "Found Student"
                          : "Found Students"}
                      </p>
                      <h2 className="mt-1 text-3xl font-black">
                        {students.length === 1
                          ? students[0].name || "Unnamed Student"
                          : `${students.length} students`}
                      </h2>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/12 px-5 py-3 ring-1 ring-white/20">
                    <p className="text-xs font-bold uppercase tracking-wide text-violet-100">
                      Class / Roll
                    </p>
                    <p className="text-xl font-black">
                      {students.length === 1
                        ? `${students[0].classValue || standard} / ${
                            students[0].rollNumber || roll
                          }`
                        : `Standard ${standard}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6">
                {students.map((item) => (
                  <div
                    key={item._id || `${item.classValue}-${item.rollNumber}`}
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                  >
                    {students.length > 1 && (
                      <div className="border-b border-gray-100 bg-violet-50 px-5 py-4">
                        <h3 className="text-xl font-black text-gray-950">
                          {item.name || "Unnamed Student"}
                        </h3>
                      </div>
                    )}
                    <div className="border-b border-gray-100 bg-gradient-to-r from-violet-50 to-purple-50 px-5 py-4">
                      <Link
                        to={`/students/addMarks?standard=${
                          item.classValue || standard
                        }&roll=${item.rollNumber || roll}`}
                        className="group inline-flex w-full items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-white px-4 py-3 font-bold text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-100 sm:w-auto"
                      >
                        <span className="inline-flex min-w-0 items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 ring-1 ring-violet-200">
                            <Icon name="chart" className="h-5 w-5" />
                          </span>
                          <span className="leading-tight">
                            View Subject Marks
                          </span>
                        </span>
                        <span className="text-xl text-violet-500 transition group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </Link>
                    </div>
                    <div className="grid gap-4 p-5 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <MarksPanel marks={item.marks} meta={item.marksMeta} />
                      </div>
                      <Field label="Full Name" value={item.name} icon="user" />
                      <Field
                        label="Roll Number"
                        value={item.rollNumber}
                        icon="hash"
                        tone="blue"
                      />
                      <Field
                        label="Standard"
                        value={item.classValue}
                        icon="book"
                        tone="green"
                      />
                      <Field
                        label="Village"
                        value={item.village}
                        icon="map"
                        tone="rose"
                      />
                      <Field
                        label="Attendance"
                        value={
                          item.attendance ? `${item.attendance}%` : undefined
                        }
                        icon="chart"
                        tone="green"
                      />
                      <Field
                        label="Parent Name"
                        value={item.parentName}
                        icon="user"
                        tone="blue"
                      />
                      <Field
                        label="Parent Phone"
                        value={item.parentPhone}
                        icon="phone"
                        tone="violet"
                      />
                      <Field
                        label="Parent Email"
                        value={item.parentEmail}
                        icon="mail"
                        tone="rose"
                      />
                      <div className="md:col-span-2">
                        <Field
                          label="Address"
                          value={item.address}
                          icon="home"
                          tone="blue"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[470px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                <Icon name="search" className="h-10 w-10" />
              </div>
              <h2 className="mt-5 text-2xl font-black text-gray-950">
                Search for a student
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600">
                The fetched student profile will appear here with academic,
                parent, and contact details.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
