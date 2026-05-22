import { useMemo, useState } from "react";
import {
  getAttendanceDay,
  getStudent,
  markAttendanceHoliday,
  markStudentAttendance,
  removeAttendanceHoliday,
} from "../../../services/studentservice";

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
  calendar: (
    <path
      d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
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

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const sortByRollNumber = (a, b) => {
  const first = Number(a.rollNumber);
  const second = Number(b.rollNumber);

  if (Number.isNaN(first) || Number.isNaN(second)) {
    return String(a.rollNumber).localeCompare(String(b.rollNumber));
  }

  return first - second;
};

export function MarkAttendance() {
  const [standard, setStandard] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [students, setStudents] = useState([]);
  const [presentMap, setPresentMap] = useState({});
  const [holiday, setHoliday] = useState(null);
  const [holidayReason, setHolidayReason] = useState("Holiday");
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const attendanceDate = getToday();

  const presentCount = useMemo(
    () => Object.values(presentMap).filter(Boolean).length,
    [presentMap],
  );

  const handleShow = async (e) => {
    e.preventDefault();
    if (!standard) return;

    try {
      setLoading(true);
      setStudents([]);
      setPresentMap({});
      setHoliday(null);
      setError("");
      setSavedMessage("");

      const [result, dayResult] = await Promise.all([
        getStudent({ standard, roll: "" }),
        getAttendanceDay({ standard, date: attendanceDate }),
      ]);
      const fetchedStudents = (result?.data || result || []).sort(sortByRollNumber);
      const day = dayResult?.data;

      setStudents(fetchedStudents);
      setHoliday(day?.isHoliday ? day : null);
      setHolidayReason(day?.reason || "Holiday");
      setPresentMap(
        fetchedStudents.reduce((marked, student) => {
          const todayRecord = student.attendanceRecords?.find(
            (record) => record.date === attendanceDate,
          );
          marked[student._id] = todayRecord?.present === true;
          return marked;
        }, {}),
      );
    } catch (err) {
      setError(err?.message || "Unable to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (studentId) => {
    if (holiday) return;
    setSavedMessage("");
    setPresentMap((current) => ({
      ...current,
      [studentId]: !current[studentId],
    }));
  };

  const markAll = (present) => {
    if (holiday) return;
    setSavedMessage("");
    setPresentMap(
      students.reduce((marked, student) => {
        marked[student._id] = present;
        return marked;
      }, {}),
    );
  };

  const handleSave = async () => {
    if (!standard || students.length === 0 || holiday) return;

    try {
      setSaving(true);
      setError("");
      setSavedMessage("");

      const result = await markStudentAttendance({
        standard,
        date: attendanceDate,
        records: students.map((student) => ({
          studentId: student._id,
          present: presentMap[student._id] === true,
        })),
      });

      setStudents((result?.data || students).sort(sortByRollNumber));
      setSavedMessage(`Attendance saved for ${attendanceDate}`);
    } catch (err) {
      setError(err?.message || "Unable to save attendance");
    } finally {
      setSaving(false);
    }
  };

  const handleMarkHoliday = async () => {
    if (!standard) return;

    try {
      setSaving(true);
      setError("");
      setSavedMessage("");

      const result = await markAttendanceHoliday({
        standard,
        date: attendanceDate,
        reason: holidayReason,
      });

      setHoliday(result?.data);
      setPresentMap(
        students.reduce((marked, student) => {
          marked[student._id] = false;
          return marked;
        }, {}),
      );
      setSavedMessage(`${attendanceDate} marked as a holiday`);
    } catch (err) {
      setError(err?.message || "Unable to mark holiday");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveHoliday = async () => {
    if (!standard) return;

    try {
      setSaving(true);
      setError("");
      setSavedMessage("");

      await removeAttendanceHoliday({
        standard,
        date: attendanceDate,
      });

      setHoliday(null);
      setSavedMessage("Holiday removed. You can now save attendance.");
    } catch (err) {
      setError(err?.message || "Unable to remove holiday");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    setStandard("");
    setStudents([]);
    setPresentMap({});
    setHoliday(null);
    setHolidayReason("Holiday");
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
              <Icon name="calendar" className="h-7 w-7" />
            </div>
            <p className="text-sm font-bold uppercase tracking-wide text-violet-600">
              Daily Attendance
            </p>
            <h1 className="mt-1 text-3xl font-black text-gray-950">
              Mark Attendance
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Choose a standard to load students in roll-number order, then tick
              the students who are present today.
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
                    setStudents([]);
                    setPresentMap({});
                    setHoliday(null);
                    setHolidayReason("Holiday");
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

            <div className="rounded-2xl bg-violet-50 p-4 ring-1 ring-violet-100">
              <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
                Date
              </p>
              <p className="mt-1 text-xl font-black text-gray-950">
                {attendanceDate}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Mark this date as a holiday when attendance should not count.
              </p>
              <div className="mt-4 grid gap-3">
                <input
                  value={holidayReason}
                  onChange={(e) => setHolidayReason(e.target.value)}
                  disabled={Boolean(holiday) || saving}
                  placeholder="Holiday reason"
                  className="block w-full rounded-2xl border border-violet-100 bg-white px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:bg-violet-100/60"
                />
                {holiday ? (
                  <button
                    type="button"
                    onClick={handleRemoveHoliday}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Icon name="refresh" className="h-4 w-4" />
                    Remove Holiday
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleMarkHoliday}
                    disabled={!standard || saving}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm font-bold text-violet-700 shadow-sm transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Icon name="calendar" className="h-4 w-4" />
                    Mark Holiday
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                disabled={loading || !standard}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 font-bold text-white shadow-lg transition ${
                  loading || !standard
                    ? "cursor-not-allowed bg-violet-300 shadow-none"
                    : "bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200 hover:from-violet-600 hover:to-purple-600 active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                ) : (
                  <Icon name="search" />
                )}
                {loading ? "Loading..." : "Show Students"}
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
                  <Icon name="users" className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-violet-200">
                    {holiday ? "Holiday" : "Attendance Sheet"}
                  </p>
                  <h2 className="mt-1 text-3xl font-black">
                    {students.length > 0
                      ? `Standard ${standard}`
                      : "Select a standard"}
                  </h2>
                </div>
              </div>

              <div className="rounded-2xl bg-white/12 px-5 py-3 ring-1 ring-white/20">
                <p className="text-xs font-bold uppercase tracking-wide text-violet-100">
                  Present
                </p>
                <p className="text-xl font-black">
                  {holiday ? "No count" : `${presentCount} / ${students.length}`}
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[470px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-500" />
              </div>
              <p className="mt-5 text-lg font-black text-gray-900">
                Loading students
              </p>
            </div>
          ) : students.length > 0 ? (
            <div className="p-6">
              {holiday && (
                <div className="mb-4 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800">
                  {attendanceDate} is marked as {holiday.reason || "Holiday"}.
                  Attendance is disabled and this day will not affect monthly
                  percentage.
                </div>
              )}

              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => markAll(true)}
                    disabled={Boolean(holiday)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Icon name="check" className="h-4 w-4" />
                    All Present
                  </button>
                  <button
                    type="button"
                    onClick={() => markAll(false)}
                    disabled={Boolean(holiday)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Icon name="refresh" className="h-4 w-4" />
                    Reset Ticks
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || Boolean(holiday)}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition ${
                    saving || holiday
                      ? "cursor-not-allowed bg-violet-300 shadow-none"
                      : "bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200 hover:from-violet-600 hover:to-purple-600 active:scale-[0.98]"
                  }`}
                >
                  {saving ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                  ) : (
                    <Icon name="check" className="h-4 w-4" />
                  )}
                  {saving ? "Saving..." : "Save Attendance"}
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="grid grid-cols-[88px_1fr_120px] bg-violet-50 px-4 py-3 text-xs font-black uppercase tracking-wide text-gray-600">
                  <span>Roll No</span>
                  <span>Name</span>
                  <span className="text-center">Present</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {students.map((student) => (
                    <label
                      key={student._id}
                      className="grid cursor-pointer grid-cols-[88px_1fr_120px] items-center px-4 py-3 transition hover:bg-violet-50/50"
                    >
                      <span className="font-black text-gray-900">
                        {student.rollNumber}
                      </span>
                      <span className="min-w-0 truncate font-bold text-gray-800">
                        {student.name || "Unnamed Student"}
                      </span>
                      <span className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={presentMap[student._id] === true}
                          onChange={() => handleToggle(student._id)}
                          disabled={Boolean(holiday)}
                          className="h-5 w-5 rounded border-gray-300 text-violet-500 accent-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                        />
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[470px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                <Icon name="users" className="h-10 w-10" />
              </div>
              <h2 className="mt-5 text-2xl font-black text-gray-950">
                No sheet loaded
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600">
                Select a standard and load students to mark today's attendance.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
