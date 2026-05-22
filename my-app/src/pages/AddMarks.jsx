import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  addStudentMarks,
  getStudent,
  getStudentMarks,
} from "../../services/studentservice";

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
  plus: (
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
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
  user: (
    <path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
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

const getExamTypeLabel = (value) =>
  EXAM_TYPES.find((item) => item.value === value)?.label || value;

const currentYear = () => String(new Date().getFullYear());

const emptyMarks = () =>
  DEFAULT_SUBJECTS.reduce((marks, subject) => {
    marks[subject] = "";
    return marks;
  }, {});

const sortMarks = (marks) =>
  Object.entries(marks).sort(([first], [second]) =>
    first.localeCompare(second),
  );

export function AddMarks({ canEdit = false }) {
  const [searchParams] = useSearchParams();
  const [standard, setStandard] = useState(searchParams.get("standard") || "");
  const [roll, setRoll] = useState(searchParams.get("roll") || "");
  const [student, setStudent] = useState(null);
  const [marks, setMarks] = useState(emptyMarks);
  const [examClass, setExamClass] = useState(searchParams.get("standard") || "");
  const [examType, setExamType] = useState("");
  const [academicYear, setAcademicYear] = useState(currentYear);
  const [newSubject, setNewSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const total = useMemo(
    () =>
      Object.values(marks).reduce((sum, value) => {
        const mark = Number(value);
        return Number.isFinite(mark) ? sum + mark : sum;
      }, 0),
    [marks],
  );

  const filledSubjects = useMemo(
    () => Object.values(marks).filter((value) => String(value).trim()).length,
    [marks],
  );

  const average = filledSubjects ? Math.round(total / filledSubjects) : 0;

  const loadStudent = async ({ silent = false } = {}) => {
    if (!standard || !roll) return;

    try {
      setLoading(true);
      setError("");
      setSavedMessage("");

      const result = await getStudent({ standard, roll });
      const fetchedStudent = result?.data || result;
      const marksResult = await getStudentMarks({
        studentId: fetchedStudent?._id,
        standard,
        roll,
        examClass,
        examType,
        academicYear,
      });
      const fetchedMarks = marksResult?.data?.marks || fetchedStudent?.marks || {};
      const fetchedMeta = {
        ...(fetchedStudent?.marksMeta || {}),
        ...(marksResult?.data || {}),
      };

      setStudent(fetchedStudent);
      setExamClass(fetchedMeta.examClass || fetchedStudent?.classValue || standard);
      setExamType(fetchedMeta.examType || "");
      setAcademicYear(fetchedMeta.academicYear || academicYear || currentYear());
      setMarks({
        ...(canEdit ? emptyMarks() : {}),
        ...Object.fromEntries(
          Object.entries(fetchedMarks).map(([subject, mark]) => [
            subject,
            String(mark),
          ]),
        ),
      });

      if (!silent) {
        setSavedMessage(
          canEdit
            ? "Student loaded. You can update marks now."
            : "Student loaded. Showing the selected marks sheet.",
        );
      }
    } catch (err) {
      setStudent(null);
      setError(err?.message || "Unable to load student marks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (standard && roll) {
      loadStudent({ silent: true });
    }
  }, []);

  const updateMark = (subject, value) => {
    if (!canEdit) return;
    if (value && !/^\d{0,3}$/.test(value)) return;
    setSavedMessage("");
    setMarks((current) => ({
      ...current,
      [subject]: value,
    }));
  };

  const addSubject = () => {
    if (!canEdit) return;
    const subject = newSubject.trim();
    if (!subject || marks[subject] !== undefined) return;

    setMarks((current) => ({
      ...current,
      [subject]: "",
    }));
    setNewSubject("");
    setSavedMessage("");
  };

  const removeSubject = (subject) => {
    if (!canEdit) return;
    setMarks((current) => {
      const next = { ...current };
      delete next[subject];
      return next;
    });
    setSavedMessage("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadStudent();
  };

  const handleSave = async () => {
    if (!canEdit) return;
    if (!student) return;

    if (!examClass || !examType) {
      setError("Choose the marks class, year, and exam type.");
      return;
    }

    if (!academicYear.trim()) {
      setError("Choose the marks class, year, and exam type.");
      return;
    }

    const normalized = {};
    for (const [subject, value] of Object.entries(marks)) {
      if (String(value).trim() === "") continue;
      const mark = Number(value);
      if (!Number.isFinite(mark) || mark < 0 || mark > 100) {
        setError("Marks must be numbers between 0 and 100.");
        return;
      }
      normalized[subject] = mark;
    }

    if (Object.keys(normalized).length === 0) {
      setError("Enter at least one subject mark.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSavedMessage("");

      const result = await addStudentMarks({
        studentId: student._id,
        standard,
        roll,
        examClass,
        examType,
        academicYear,
        marks: normalized,
      });

      const savedMarks = result?.data?.marks || normalized;
      setExamClass(result?.data?.examClass || examClass);
      setExamType(result?.data?.examType || examType);
      setAcademicYear(result?.data?.academicYear || academicYear);
      setMarks({
        ...emptyMarks(),
        ...Object.fromEntries(
          Object.entries(savedMarks).map(([subject, mark]) => [
            subject,
            String(mark),
          ]),
        ),
      });
      setSavedMessage("Marks saved successfully.");
    } catch (err) {
      setError(err?.message || "Unable to save marks");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    setStandard("");
    setRoll("");
    setStudent(null);
    setMarks(emptyMarks());
    setExamClass("");
    setExamType("");
    setAcademicYear(currentYear());
    setNewSubject("");
    setError("");
    setSavedMessage("");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#faf5ff,#f5f3ff_48%,#ddd6fe)] px-4 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[390px_1fr]">
        <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 shadow-2xl shadow-violet-200/40 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-violet-100/70" />

          <div className="relative mb-7">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-200">
              <Icon name="chart" className="h-7 w-7" />
            </div>
            <p className="text-sm font-bold uppercase tracking-wide text-violet-600">
              Student Marks
            </p>
            <h1 className="mt-1 text-3xl font-black text-gray-950">
              Add Marks
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {canEdit
                ? "Search a student by standard and roll number, then enter marks for each subject."
                : "Search a student by standard and roll number to view saved marks."}
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative grid gap-4">
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
                    setExamClass(e.target.value);
                    setStudent(null);
                    setError("");
                    setSavedMessage("");
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
              </span>
              <div className="relative mt-2">
                <Icon
                  name="hash"
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500"
                />
                <input
                  value={roll}
                  onChange={(e) => {
                    if (!/^\d*$/.test(e.target.value)) return;
                    setRoll(e.target.value);
                    setStudent(null);
                    setError("");
                    setSavedMessage("");
                  }}
                  placeholder="Enter roll number"
                  className="block w-full rounded-2xl border border-gray-200 bg-white px-11 py-3 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-gray-700">
                  Marks Class
                </span>
                <select
                  value={examClass}
                  onChange={(e) => {
                    setExamClass(e.target.value);
                    setStudent(null);
                    setError("");
                    setSavedMessage("");
                  }}
                  className="mt-2 block w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                >
                  <option value="">Any class</option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      Class {n}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-gray-700">Year</span>
                <input
                  value={academicYear}
                  onChange={(e) => {
                    if (!/^\d{0,4}$/.test(e.target.value)) return;
                    setAcademicYear(e.target.value);
                    setStudent(null);
                    setError("");
                    setSavedMessage("");
                  }}
                  placeholder={currentYear()}
                  className="mt-2 block w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-bold text-gray-700">Exam Type</span>
              <select
                value={examType}
                onChange={(e) => {
                  setExamType(e.target.value);
                  setStudent(null);
                  setError("");
                  setSavedMessage("");
                }}
                className="mt-2 block w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              >
                <option value="">Any exam type</option>
                {EXAM_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                disabled={loading || !standard || !roll}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 font-bold text-white shadow-lg transition ${
                  loading || !standard || !roll
                    ? "cursor-not-allowed bg-violet-300 shadow-none"
                    : "bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200 hover:from-violet-600 hover:to-purple-600 active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                ) : (
                  <Icon name="search" />
                )}
                {loading ? "Loading..." : "Search Marks"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
              >
                <Icon name="refresh" />
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

          {savedMessage && (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{savedMessage}</span>
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-violet-200/40 backdrop-blur-sm">
          <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-violet-800 p-6 text-white">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                  <Icon name="user" className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-violet-200">
                    {student
                      ? "Selected Student"
                      : canEdit
                        ? "Marks Entry"
                        : "Marks View"}
                  </p>
                  <h2 className="mt-1 text-3xl font-black">
                    {student?.name || "Load a student"}
                  </h2>
                </div>
              </div>

              <div className="rounded-2xl bg-white/12 px-5 py-3 ring-1 ring-white/20">
                <p className="text-xs font-bold uppercase tracking-wide text-violet-100">
                  Average
                </p>
                <p className="text-xl font-black">{average}%</p>
              </div>
            </div>
          </div>

          {student ? (
            <div className="p-6">
              <div className="mb-5 grid gap-4 md:grid-cols-6">
                <div className="rounded-2xl border border-gray-100 bg-violet-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
                    Roll Number
                  </p>
                  <p className="mt-1 text-2xl font-black text-gray-950">
                    {student.rollNumber}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-blue-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                    Standard
                  </p>
                  <p className="mt-1 text-2xl font-black text-gray-950">
                    {student.classValue}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-violet-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
                    Marks Class
                  </p>
                  <p className="mt-1 text-2xl font-black text-gray-950">
                    {examClass ? `Class ${examClass}` : "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-rose-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-rose-700">
                    Exam Type
                  </p>
                  <p className="mt-1 text-xl font-black text-gray-950">
                    {examType ? getExamTypeLabel(examType) : "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-cyan-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">
                    Year
                  </p>
                  <p className="mt-1 text-2xl font-black text-gray-950">
                    {academicYear || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-emerald-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                    Total Marks
                  </p>
                  <p className="mt-1 text-2xl font-black text-gray-950">
                    {total}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div
                  className={`grid ${
                    canEdit ? "grid-cols-[1fr_112px_48px]" : "grid-cols-[1fr_112px]"
                  } bg-violet-50 px-4 py-3 text-xs font-black uppercase tracking-wide text-gray-600`}
                >
                  <span>Subject</span>
                  <span>Marks</span>
                  {canEdit && <span />}
                </div>

                <div className="divide-y divide-gray-100">
                  {sortMarks(marks).length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm font-bold text-gray-500">
                      No marks found for this class, year, and exam type.
                    </div>
                  ) : (
                    sortMarks(marks).map(([subject, mark]) => (
                    <div
                      key={subject}
                      className={`grid ${
                        canEdit
                          ? "grid-cols-[1fr_112px_48px]"
                          : "grid-cols-[1fr_112px]"
                      } items-center gap-3 px-4 py-3`}
                    >
                      <span className="min-w-0 truncate font-bold text-gray-900">
                        {subject}
                      </span>
                      {canEdit ? (
                        <>
                          <input
                            value={mark}
                            onChange={(e) => updateMark(subject, e.target.value)}
                            placeholder="0"
                            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-center font-bold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                          />
                          <button
                            type="button"
                            onClick={() => removeSubject(subject)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-lg font-black text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                            aria-label={`Remove ${subject}`}
                          >
                            x
                          </button>
                        </>
                      ) : (
                        <span className="rounded-xl bg-violet-50 px-3 py-2 text-center font-black text-violet-700 ring-1 ring-violet-100">
                          {mark || "-"}
                        </span>
                      )}
                    </div>
                    ))
                  )}
                </div>
              </div>

              {canEdit && (
                <div className="mt-5 flex flex-col gap-3 border-t border-violet-100 pt-5 sm:flex-row">
                  <input
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Add another subject"
                    className="block flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                  <button
                    type="button"
                    onClick={addSubject}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-5 py-3 font-bold text-violet-700 shadow-sm transition hover:bg-violet-50 active:scale-[0.98]"
                  >
                    <Icon name="plus" />
                    Add Subject
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving || !examClass || !examType || !academicYear}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold text-white shadow-lg transition ${
                      saving || !examClass || !examType || !academicYear
                        ? "cursor-not-allowed bg-violet-300 shadow-none"
                        : "bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200 hover:from-violet-600 hover:to-purple-600 active:scale-[0.98]"
                    }`}
                  >
                    {saving ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                    ) : (
                      <Icon name="check" />
                    )}
                    {saving ? "Saving..." : "Save Marks"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex min-h-[470px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                <Icon name="chart" className="h-10 w-10" />
              </div>
              <h2 className="mt-5 text-2xl font-black text-gray-950">
                No student loaded
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600">
                Enter a standard and roll number to load the student marks
                sheet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
