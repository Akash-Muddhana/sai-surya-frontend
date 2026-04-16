import { useState } from "react";
import { Header } from "../../components/header";
import { useNavigate } from "react-router-dom";
export function Host() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    // simulate a login interaction
    setSubmitted(true);
    setMessage("Signed in successfully");
    setTimeout(() => setSubmitted(false), 1200);
    setTimeout(() => setMessage(""), 2600);
    console.log("login", { email, password });
  };

  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff4e6] via-[#ffd29a] to-[#ff9a3a] px-4">
        <div
          className={`w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transform transition-all duration-300 ${submitted ? "scale-105 ring-4 ring-[#ffa31a]/30" : "hover:scale-105 hover:shadow-2xl"}`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Host Login
          </h2>
          <p className="text-sm text-gray-700 mb-6">
            Sign in to access host features
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-700">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffa31a] transition"
              />
              {email && !/^\S+@\S+\.\S+$/.test(email) && (
                <p className="text-xs text-red-600 mt-1 animate-pulse">
                  Please enter a valid email
                </p>
              )}
            </label>

            <label className="block relative">
              <span className="text-sm text-gray-700">Password</span>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffa31a] transition"
              />
            </label>

            <button
              onClick={() => {
                navigate("/hostdashboard");
              }}
              type="submit"
              aria-busy={submitted}
              disabled={
                !email || !password || (email && !/^\S+@\S+\.\S+$/.test(email))
              }
              className={`w-full mt-2 inline-flex justify-center items-center gap-2 rounded-md px-4 py-2 text-white font-medium transition transform ${!email || !password || (email && !/^\S+@\S+\.\S+$/.test(email)) ? "from-[#ffcc80] to-[#ffb56b] bg-gradient-to-r cursor-not-allowed opacity-80" : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 shadow-lg"}`}
            >
              {submitted ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span className="ml-2">Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-800">
            <a href="#" className="text-[#6b2700] hover:underline">
              Forgot password?
            </a>
          </div>

          {message && (
            <div className="mt-4 p-2 rounded-md bg-green-50 text-green-800 text-center animate-pulse">
              {message}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
