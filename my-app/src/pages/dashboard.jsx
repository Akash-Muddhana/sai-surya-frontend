import { useState, useEffect } from "react";
import { Header } from "../components/header";

export function Dashboard({ notice }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => setDismissed(false), [notice]);
  const visible = Boolean(notice) && !dismissed;

  return (
    <>
      <Header />

      {/* Notice bar */}
      <div className={`max-w-6xl mx-auto px-4 mt-4 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        {notice && (
          <div className="flex items-start gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-3 shadow-lg">
              <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16 8a4 4 0 010 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.07 5.93a8 8 0 010 12.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 5.5L6 9H3v6h3l5 3.5V5.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold">Notice</p>
                <button onClick={() => setDismissed(true)} aria-label="Dismiss notice" className="text-white/90 hover:text-white rounded-md p-1 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <p className="mt-1 text-sm leading-snug">{notice}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}