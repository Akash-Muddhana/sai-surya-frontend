import { useEffect, useState } from "react";
import axios from "axios";
import { addTeacher } from "../../../services/teacherservice";

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
  briefcase: (
    <path
      d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1M3 9h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM9 13h6"
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
  lock: (
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
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

export function AddTeacher() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoggedIn, setIsLoggedInLocal] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [password, setPassword] = useState("");
  const isEmailValid = email === "" ? true : /^\S+@\S+\.\S+$/.test(email);
  const isAgeValid = age === "" ? true : /^\d{1,3}$/.test(age);
  const isPasswordValid = password.length >= 6;
  const canSubmit =
    name &&
    subject &&
    age &&
    email &&
    experience &&
    isEmailValid &&
    isAgeValid &&
    password &&
    isPasswordValid &&
    !loading;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5000/api/auth", {
          withCredentials: true,
        });
        setIsLoggedInLocal(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsLoggedInLocal(false);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  const resetForm = () => {
    setName("");
    setSubject("");
    setAge("");
    setEmail("");
    setExperience("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);
      setSaved(false);
      await addTeacher({ name, age, subject, email, experience, password });
      setSaved(true);
      resetForm();
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      console.error("Failed to add teacher:", err);
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
            Please log in to add a new teacher profile.
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
              <Icon name="spark" className="h-8 w-8" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-white/85">
              Faculty Registration
            </p>
            <h1 className="mt-2 text-4xl font-black">Add Teacher</h1>
            <p className="mt-3 text-sm leading-6 text-white/90">
              Create a teacher profile with subject, contact, and experience
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
                      ? "The teacher has been added."
                      : "Fill all required details to save."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Required Fields
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Name, subject, age, email, experience, and password are required before
                submission.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl shadow-violet-200/40">
          <div className="mb-6 flex flex-col gap-3 border-b border-violet-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-violet-600">
                Teacher Form
              </p>
              <h2 className="mt-1 text-3xl font-black text-gray-950">
                Profile Details
              </h2>
            </div>
            {saved && (
              <span className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
                <Icon name="check" className="h-4 w-4" />
                Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <Field
              label="Full Name"
              icon="user"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) setName(value);
              }}
              placeholder="e.g. Priya Sharma"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Subject"
                icon="book"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mathematics"
              />
              <Field
                label="Experience"
                icon="briefcase"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 5 years"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Age"
                icon="user"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 34"
                error={age && !isAgeValid ? "Enter a valid age" : ""}
              />
              <Field
                label="Email"
                icon="mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. teacher@example.com"
                error={email && !isEmailValid ? "Enter a valid email" : ""}
              />
              <Field
                label="Password"
                icon="lock"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                error={
                  password && !isPasswordValid
                    ? "Password must be at least 6 characters"
                    : ""
                }
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-violet-100 pt-6 sm:flex-row">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold text-white shadow-lg transition active:scale-[0.98] ${
                  canSubmit
                    ? "bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200 hover:from-violet-600 hover:to-purple-600"
                    : "cursor-not-allowed bg-violet-300 shadow-none"
                }`}
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                ) : (
                  <Icon name="arrow" />
                )}
                {loading ? "Saving..." : "Save Teacher"}
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
