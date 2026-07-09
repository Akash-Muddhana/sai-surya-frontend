import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { logout } from "../../services/authservice";
import { apiUrl } from "../../services/api";
import saiSuryaLogo from "../assets/sai-surya-logo.jpeg";

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
  bell: (
    <path
      d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7M13.73 21a2 2 0 0 1-3.46 0"
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
  dashboard: (
    <path
      d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z"
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
  login: (
    <path
      d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  logout: (
    <path
      d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M17 16l4-4-4-4M21 12H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  menu: (
    <path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
  plusUser: (
    <path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M16 11h6"
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

const NavLink = ({ href, icon, children }) => (
  <Link
    to={href}
    className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-gray-700 transition hover:bg-violet-50 hover:text-violet-700"
  >
    <Icon name={icon} className="h-4 w-4" />
    {children}
  </Link>
);

const MenuItem = ({ href, icon, title, subtitle, onClick, danger = false }) => {
  const content = (
    <>
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
          danger ? "bg-red-50 text-red-600" : "bg-violet-50 text-violet-600"
        }`}
      >
        <Icon name={icon} />
      </span>
      <span>
        <span className="block font-black">{title}</span>
        <span
          className={`block text-xs ${danger ? "text-red-500" : "text-gray-500"}`}
        >
          {subtitle}
        </span>
      </span>
    </>
  );

  const className = `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
    danger
      ? "text-red-700 hover:bg-red-50"
      : "text-gray-700 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 hover:text-violet-700"
  }`;

  return href ? (
    <Link to={href} className={className}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
};

export function Header({
  isLoggedIn,
  setIsLoggedIn,
  isTeacherLoggedIn,
  setIsTeacherLoggedIn,
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [prevActive, setPrevActive] = useState(null);

  useEffect(() => {
    if (
      typeof setIsLoggedIn !== "function" ||
      typeof setIsTeacherLoggedIn !== "function"
    ) {
      return;
    }
    const token = localStorage.getItem("token");
    const authHeaders = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    axios
      .get(apiUrl("/api/auth"), authHeaders)
      .then((res) => {
        const authenticated = res.data?.isLoggedIn === true;
        setIsLoggedIn(authenticated);
        if (!authenticated) setMoreOpen(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setMoreOpen(false);
      });

    axios
      .get(apiUrl("/api/auth/teacher"), authHeaders)
      .then((res) => {
        const authenticated = res.data?.isTeacherLoggedIn === true;
        setIsTeacherLoggedIn(authenticated);
      })
      .catch(() => setIsTeacherLoggedIn(false));
  }, [setIsLoggedIn, setIsTeacherLoggedIn]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setIsTeacherLoggedIn(false);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    if (moreOpen) {
      setPrevActive(document.activeElement);
      const panel = document.getElementById("host-more-panel");
      if (panel) {
        const focusable = panel.querySelectorAll(
          'a,button,[tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length) focusable[0].focus();
      }

      const onKey = (e) => {
        if (e.key === "Escape") setMoreOpen(false);
        if (e.key === "Tab") {
          const panel = document.getElementById("host-more-panel");
          if (!panel) return;
          const nodes = Array.from(
            panel.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])'),
          );
          if (nodes.length === 0) return;
          const idx = nodes.indexOf(document.activeElement);
          if (e.shiftKey && idx === 0) {
            e.preventDefault();
            nodes[nodes.length - 1].focus();
          } else if (!e.shiftKey && idx === nodes.length - 1) {
            e.preventDefault();
            nodes[0].focus();
          }
        }
      };

      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }

    if (prevActive && prevActive.focus) prevActive.focus();
  }, [moreOpen, prevActive]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-violet-100/80 bg-white/90 text-gray-900 shadow-lg shadow-violet-100/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black shadow-lg shadow-violet-200 ring-2 ring-amber-300/70">
                <img
                  src={saiSuryaLogo}
                  alt="Sri Sai Surya School logo"
                  className="h-full w-full object-cover"
                />
              </span>
              <span>
                <span className="block text-lg font-black leading-tight text-gray-950">
                  Sai Surya
                </span>
                <span className="block text-xs font-bold uppercase tracking-wide text-violet-600">
                  School Portal
                </span>
              </span>
            </Link>

            <button
              onClick={() => setMoreOpen((s) => !s)}
              aria-expanded={moreOpen}
              className="inline-flex items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 p-3 text-violet-700 transition hover:bg-violet-100 md:hidden"
            >
              <Icon name="menu" />
            </button>
          </div>

          <nav className="flex flex-wrap items-center gap-2 rounded-3xl border border-violet-100 bg-white/80 p-2 shadow-sm">
            <NavLink href="/" icon="home">
              Home
            </NavLink>
            <NavLink href="/students" icon="user">
              Students
            </NavLink>
            <NavLink href="/teachers" icon="users">
              Teachers
            </NavLink>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <button
                onClick={() => setMoreOpen((s) => !s)}
                aria-expanded={moreOpen}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 px-4 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:brightness-105 active:scale-[0.98]"
              >
                <Icon name="menu" className="h-4 w-4" />
                Host Menu
              </button>
            ) : isTeacherLoggedIn ? (
              <button
                onClick={() => setMoreOpen((s) => !s)}
                aria-expanded={moreOpen}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:brightness-105 active:scale-[0.98]"
              >
                <Icon name="menu" className="h-4 w-4" />
                Teacher Menu
              </button>
            ) : (
              <>
                <Link
                  to="/host"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 px-4 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:brightness-105 active:scale-[0.98]"
                >
                  <Icon name="login" className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  to="/teacher"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 px-4 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:brightness-105 active:scale-[0.98]"
                >
                  <Icon name="login" className="h-4 w-4" />
                  Teacher Login
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {moreOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/25 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMoreOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="host-more-panel"
        tabIndex={-1}
        className={`fixed right-0 top-0 z-[90] h-full w-[min(88vw,360px)] transform overflow-y-auto bg-white text-gray-900 shadow-2xl transition-transform duration-300 ${
          moreOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!moreOpen}
      >
        <div
          className={`p-6 text-white ${
            isTeacherLoggedIn && !isLoggedIn
              ? "bg-gradient-to-r from-violet-500 to-purple-500"
              : "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                <Icon name="dashboard" className="h-7 w-7" />
              </div>
              <h4 className="text-2xl font-black">
                {isTeacherLoggedIn && !isLoggedIn
                  ? "Teacher Options"
                  : "Host Options"}
              </h4>
              <p className="mt-1 text-sm font-semibold text-white/85">
                {isTeacherLoggedIn && !isLoggedIn
                  ? "Manage classroom records"
                  : "Manage school records"}
              </p>
            </div>
            <button
              onClick={() => setMoreOpen(false)}
              aria-label="Close host options"
              className="rounded-2xl p-2 text-white transition hover:bg-white/20"
            >
              <Icon name="x" className="h-6 w-6" />
            </button>
          </div>
        </div>

        <nav className="space-y-2 p-4">
          {isLoggedIn ? (
            <>
              <MenuItem
                href="/host/dashboard"
                icon="dashboard"
                title="Dashboard"
                subtitle="Host overview"
              />
              <MenuItem
                href="/notice"
                icon="bell"
                title="Add Notice"
                subtitle="Announce to staff"
              />
              <MenuItem
                href="/teachers/add"
                icon="plusUser"
                title="Add Teacher"
                subtitle="Register new teacher"
              />
              <MenuItem
                href="/students/add"
                icon="plusUser"
                title="Add Student"
                subtitle="Register new student"
              />

              <hr className="my-4 border-gray-200" />

              <MenuItem
                icon="logout"
                title="Logout"
                subtitle="Sign out"
                onClick={handleLogout}
                danger
              />
            </>
          ) : isTeacherLoggedIn ? (
            <>
              <MenuItem
                href="/teacher/dashboard"
                icon="dashboard"
                title="Teacher Dashboard"
                subtitle="Open teacher area"
              />
              <MenuItem
                href="/students"
                icon="user"
                title="Student Details"
                subtitle="Search student records"
              />
              <MenuItem
                href="/students/add"
                icon="plusUser"
                title="Add Student"
                subtitle="Register new student"
              />
              <MenuItem
                href="/students/attendance"
                icon="plusUser"
                title="Mark Attendance"
                subtitle="Mark attendance for students"
              />
              <hr className="my-4 border-gray-200" />

              <MenuItem
                icon="logout"
                title="Logout"
                subtitle="Sign out"
                onClick={handleLogout}
                danger
              />
            </>
          ) : (
            <>
              <MenuItem
                href="/host"
                icon="login"
                title="Login"
                subtitle="Access host tools"
              />
              <MenuItem
                href="/students"
                icon="user"
                title="Student Details"
                subtitle="Search student records"
              />
              <MenuItem
                href="/teachers"
                icon="users"
                title="Teacher Details"
                subtitle="View faculty directory"
              />
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
