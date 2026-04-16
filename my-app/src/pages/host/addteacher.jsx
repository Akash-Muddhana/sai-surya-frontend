import { useState } from "react";
import { HostHeader } from "./hostheader";

export function AddTeacher() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const isEmailValid = email === "" ? true : /^\S+@\S+\.\S+$/.test(email);
  const isAgeValid = age === "" ? true : /^\d{1,3}$/.test(age);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !subject || !age || !email || !isEmailValid || !isAgeValid)
      return;
    setLoading(true);
    setSaved(false);
    // simulate API save
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
      // reset form (optional)
      setName("");
      setSubject("");
      setAge("");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf6] to-[#fff0d6]">
      <HostHeader />

      <main className="max-w-3xl mx-auto mt-8 px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform transition hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Add Teacher</h2>
              <p className="text-sm text-gray-600">
                Add a new teacher to the system.
              </p>
            </div>
            <div className="text-sm">
              {saved ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700">
                  Saved ✓
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-amber-700">
                  Draft
                </span>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-sm text-gray-700">Full name</span>
              <input
                value={name}
                type="text"
                onChange={(e) => {
                  const value = e.target.value;
                
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    setName(value);
                  }
                }}
                placeholder="e.g. Priya Sharma"
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffa31a] transition focus:shadow-md"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Subject</span>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mathematics"
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffa31a] transition focus:shadow-md"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-gray-700">Age</span>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 34"
                  className={`mt-1 block w-full px-4 py-2 rounded-lg border ${age && !isAgeValid ? "border-red-400" : "border-gray-200"} bg-white focus:outline-none focus:ring-2 focus:ring-[#ffa31a] transition focus:shadow-md`}
                />
                {age && !isAgeValid && (
                  <p className="text-xs text-red-600 mt-1">Enter a valid age</p>
                )}
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. teacher@example.com"
                  className={`mt-1 block w-full px-4 py-2 rounded-lg border ${email && !isEmailValid ? "border-red-400" : "border-gray-200"} bg-white focus:outline-none focus:ring-2 focus:ring-[#ffa31a] transition focus:shadow-md`}
                />
                {email && !isEmailValid && (
                  <p className="text-xs text-red-600 mt-1">
                    Enter a valid email
                  </p>
                )}
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={
                  !name ||
                  !subject ||
                  !age ||
                  !email ||
                  !isEmailValid ||
                  !isAgeValid
                }
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white font-medium transition ${!name || !subject || !age || !email || !isEmailValid || !isAgeValid ? "from-[#ffcc80] to-[#ffb56b] bg-gradient-to-r opacity-70 cursor-not-allowed" : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg active:scale-95"}`}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
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
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Save teacher</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setName("");
                  setSubject("");
                  setAge("");
                  setEmail("");
                }}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
