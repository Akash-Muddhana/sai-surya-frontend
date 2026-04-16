export function Header() {
  return (
    <header className="bg-[#ffa31a] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="font-bold text-lg hover:underline">
            Home
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/studentDetails" className="font-bold text-lg hover:underline">
            Student Details
          </a>
        </div>
         <div className="flex items-center gap-3">
          <a href="/teacherdetails" className="font-bold text-lg hover:underline">
           teacher details
          </a>
        </div>
        <nav className="flex gap-3">
          <a
            href="/host"
            className="px-3 py-1 rounded hover:bg-white/20 transition"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
