import { useState } from "react";
import { HostHeader } from "./hostheader";
import { Dashboard } from "../dashboard";
import { useNavigate } from "react-router-dom";

export function Notice({notice,setNotice}) {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const charLimit = 280;

  const handleSend = (e) => {
    e.preventDefault();
    if (notice.trim().length < 3 || notice.length > charLimit) return;
    setLoading(true);
    setSent(false);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
     navigate("/")
      setTimeout(() => setSent(false), 2200);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f0] via-[#fff3e0] to-[#fff0d6]">
      <HostHeader />

      <main className="max-w-3xl mx-auto mt-8 px-4">
        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 overflow-hidden">
          <div
            className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gradient-to-tr from-amber-100 to-orange-200 opacity-30 filter blur-2xl animate-pulse"
            aria-hidden
          ></div>

          <h3 className="text-2xl font-semibold text-gray-800">Send Notice</h3>
          <p className="text-sm text-gray-600 mt-1">
            Broadcast a short notice to all teachers ,staff and parents.
          </p>

          <form onSubmit={handleSend} className="mt-6">
            <label className="block">
              <span className="text-sm text-gray-700">Notice</span>
              <textarea
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                rows={5}
                placeholder="Type your notice here (max 280 chars)..."
                className={`mt-2 block w-full px-4 py-3 rounded-lg border ${notice.length > charLimit ? "border-red-400" : "border-gray-200"} bg-white focus:outline-none focus:ring-2 focus:ring-[#ffa31a] transition focus:shadow-md resize-none`}
              />
            </label>

            <div className="flex items-center justify-between mt-3">
              <div className="text-sm text-gray-500">
                {notice.length} / {charLimit} chars
              </div>
              <div className="flex items-center gap-3">
                {sent && (
                  <div className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
                    Sent ✓
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    notice.trim().length < 3 ||
                    notice.length > charLimit
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition ${loading || notice.trim().length < 3 || notice.length > charLimit ? "from-[#ffd8a8] to-[#ffc28a] bg-gradient-to-r opacity-70 cursor-not-allowed" : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg active:scale-95"}`}
                >
                  {loading ? (
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
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <span>{loading ? "Sending..." : "Send Notice"}</span>
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700">Preview</h4>
            <div
              className={`mt-2 p-4 rounded-lg ${notice ? "bg-yellow-50 border border-yellow-100" : "bg-gray-50 border border-gray-100"} text-gray-700 transition`}
            >
              {notice ? (
                notice
              ) : (
                <span className="text-gray-400">
                  Your notice preview will appear here.
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
