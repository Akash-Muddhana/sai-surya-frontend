import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addNotice } from "../../../services/noticeservice";
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
  bell: (
    <path
      d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7M13.73 21a2 2 0 0 1-3.46 0"
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
  edit: (
    <path
      d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
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

export function Notice({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const charLimit = 280;

  const noticeLength = notice.length;
  const isTooLong = noticeLength > charLimit;
  const isTooShort = notice.trim().length > 0 && notice.trim().length < 3;
  const canSend = !loading && notice.trim().length >= 3 && !isTooLong;
  const progress = Math.min(100, Math.round((noticeLength / charLimit) * 100));

  useEffect(() => {
    const validateSession = async () => {
      try {
        const token = localStorage.getItem("token");
        const authHeaders = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
        const res = await axios.get(apiUrl("/api/auth"), authHeaders);
        if (res.data?.isLoggedIn === true) {
          setIsLoggedIn?.(true);
        } else {
          setIsLoggedIn?.(false);
          localStorage.removeItem("isLoggedIn");
        }
      } catch (err) {
        console.error("Session validation failed:", err);
        setIsLoggedIn?.(false);
        localStorage.removeItem("isLoggedIn");
      }
    };

    validateSession();
  }, [setIsLoggedIn]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!canSend) return;

    try {
      setLoading(true);
      setSent(false);
      await addNotice(notice);
      setSent(true);
      setNotice("");
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      console.error("Failed to send notice:", err);
    } finally {
      setLoading(false);
    }
  };

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
            Please log in to send notices.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#faf5ff,#f5f3ff_48%,#ddd6fe)] px-4 py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[390px_1fr]">
        <section className="overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-2xl shadow-violet-200/40">
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 p-6 text-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
              <Icon name="bell" className="h-8 w-8" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-white/85">
              Notice Broadcast
            </p>
            <h1 className="mt-2 text-4xl font-black">Send Notice</h1>
            <p className="mt-3 text-sm leading-6 text-white/90">
              Share a short announcement with teachers, staff, parents, and
              students.
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
                    sent
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-white text-violet-600"
                  }`}
                >
                  <Icon name={sent ? "check" : "spark"} />
                </span>
                <div>
                  <p className="font-black text-gray-950">
                    {sent ? "Notice Sent" : "Draft Notice"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {sent
                      ? "Redirecting to dashboard..."
                      : "Write a clear notice under 280 characters."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Audience
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Icon name="users" />
                </span>
                <p className="text-sm font-semibold leading-6 text-gray-600">
                  Notices appear on the dashboard for the school community.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl shadow-violet-200/40">
          <div className="mb-6 border-b border-violet-100 pb-5">
            <p className="text-sm font-bold uppercase tracking-wide text-violet-600">
              Notice Form
            </p>
            <h2 className="mt-1 text-3xl font-black text-gray-950">
              Compose Message
            </h2>
          </div>

          <form onSubmit={handleSend} className="space-y-5">
            <label className="block">
              <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Icon name="edit" className="h-4 w-4 text-violet-500" />
                Notice Content
              </span>
              <textarea
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                rows={7}
                placeholder="Type your notice here..."
                className={`mt-2 block w-full resize-none rounded-3xl border bg-white px-5 py-4 text-base font-semibold leading-7 text-gray-900 outline-none transition focus:ring-4 ${
                  isTooLong
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-violet-400 focus:ring-violet-100"
                }`}
              />
              {(isTooLong || isTooShort) && (
                <p className="mt-2 flex items-center gap-2 text-xs font-bold text-red-600">
                  <Icon name="alert" className="h-4 w-4" />
                  {isTooLong
                    ? "Notice must be 280 characters or less."
                    : "Notice must be at least 3 characters."}
                </p>
              )}
            </label>

            <div>
              <div className="flex items-center justify-between text-sm font-bold">
                <span className={isTooLong ? "text-red-600" : "text-gray-500"}>
                  {noticeLength} / {charLimit} characters
                </span>
                <span className={isTooLong ? "text-red-600" : "text-violet-600"}>
                  {progress}%
                </span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    isTooLong
                      ? "bg-red-500"
                      : "bg-gradient-to-r from-violet-500 to-purple-500"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-violet-100 bg-violet-50/70 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-gray-900">
                <Icon name="bell" className="h-4 w-4 text-violet-600" />
                Preview
              </div>
              <div className="rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-gray-700 shadow-sm ring-1 ring-violet-100">
                {notice.trim() ? (
                  <p>{notice}</p>
                ) : (
                  <p className="text-gray-400">
                    Your notice preview will appear here.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-violet-100 pt-6 sm:flex-row">
              <button
                type="submit"
                disabled={!canSend}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold text-white shadow-lg transition active:scale-[0.98] ${
                  canSend
                    ? "bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200 hover:from-violet-600 hover:to-purple-600"
                    : "cursor-not-allowed bg-violet-300 shadow-none"
                }`}
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                ) : (
                  <Icon name="arrow" />
                )}
                {loading ? "Sending..." : "Send Notice"}
              </button>

              <button
                type="button"
                onClick={() => setNotice("")}
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
