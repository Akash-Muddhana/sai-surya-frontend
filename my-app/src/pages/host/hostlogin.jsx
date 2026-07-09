import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../../services/authservice";
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
  eye: (
    <>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  eyeOff: (
    <path
      d="M3 3l18 18M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58M9.88 5.12A9.77 9.77 0 0 1 12 5c6.5 0 10 7 10 7a18.2 18.2 0 0 1-3.2 4.2M6.35 6.35C3.62 8.2 2 12 2 12s3.5 7 10 7c1.52 0 2.86-.38 4.03-.98"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  lock: (
    <path
      d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5V11z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  login: (
    <path
      d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
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
  shield: (
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
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
};

const Icon = ({ name, className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {icons[name]}
  </svg>
);

export function Host({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const isEmailValid = email === "" ? true : /^\S+@\S+\.\S+$/.test(email);
  const canSubmit = email && password && isEmailValid && !submitted;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authHeaders = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    axios
      .get(apiUrl("/api/auth"), authHeaders)
      .then((res) => setIsLoggedIn(res.data?.isLoggedIn === true))
      .catch(() => setIsLoggedIn(false));
  }, [setIsLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setSubmitted(true);
      setMessage("");
      await login(email, password);
      setIsLoggedIn(true);
      setMessage("Signed in successfully");
      navigate("/host/dashboard");
    } catch (err) {
      setMessage(err.message || "Login failed");
      setIsLoggedIn(false);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#faf5ff,#f5f3ff_48%,#ddd6fe)] px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-120px)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[420px_1fr]">
        <section className="overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-2xl shadow-violet-200/40">
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 p-6 text-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
              <Icon name="shield" className="h-8 w-8" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-white/85">
              Host Access
            </p>
            <h1 className="mt-2 text-4xl font-black">Welcome Back</h1>
            <p className="mt-3 text-sm leading-6 text-white/90">
              Sign in to manage teachers, students, notices, and dashboard
              tools.
            </p>
          </div>

          <div className="space-y-4 p-6">
            <div className="rounded-2xl bg-violet-50 p-4 ring-1 ring-violet-100">
              <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
                Secure Portal
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600">
                  <Icon name="spark" />
                </span>
                <p className="text-sm font-semibold leading-6 text-gray-600">
                  Host tools are available only after successful authentication.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl shadow-violet-200/40">
          <div className="mb-6 border-b border-violet-100 pb-5">
            <p className="text-sm font-bold uppercase tracking-wide text-violet-600">
              Login Form
            </p>
            <h2 className="mt-1 text-3xl font-black text-gray-950">
              Host Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Icon name="mail" className="h-4 w-4 text-violet-500" />
                Email
              </span>
              <div className="relative mt-2">
                <Icon
                  name="mail"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  className={`block w-full rounded-2xl border bg-white px-12 py-3 font-semibold text-gray-900 outline-none transition focus:ring-4 ${
                    email && !isEmailValid
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-violet-400 focus:ring-violet-100"
                  }`}
                />
              </div>
              {email && !isEmailValid && (
                <p className="mt-2 flex items-center gap-2 text-xs font-bold text-red-600">
                  <Icon name="alert" className="h-4 w-4" />
                  Please enter a valid email.
                </p>
              )}
            </label>

            <label className="block">
              <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Icon name="lock" className="h-4 w-4 text-violet-500" />
                Password
              </span>
              <div className="relative mt-2">
                <Icon
                  name="lock"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                  className="block w-full rounded-2xl border border-gray-200 bg-white px-12 py-3 pr-14 font-semibold text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-gray-500 transition hover:bg-violet-50 hover:text-violet-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon
                    name={showPassword ? "eyeOff" : "eye"}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </label>

            {message && (
              <div
                className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-sm font-bold ${
                  message.toLowerCase().includes("success")
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : "bg-red-50 text-red-700 ring-1 ring-red-100"
                }`}
              >
                <Icon
                  name={
                    message.toLowerCase().includes("success")
                      ? "spark"
                      : "alert"
                  }
                  className="mt-0.5 h-4 w-4 shrink-0"
                />
                <span>{message}</span>
              </div>
            )}

            <button
              type="submit"
              aria-busy={submitted}
              disabled={!canSubmit}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold text-white shadow-lg transition active:scale-[0.98] ${
                canSubmit
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200 hover:from-violet-600 hover:to-purple-600"
                  : "cursor-not-allowed bg-violet-300 shadow-none"
              }`}
            >
              {submitted ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
              ) : (
                <Icon name="login" />
              )}
              {submitted ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
