export function HostHeader(){
  return(
    <header className="bg-[#ffa31a] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="font-bold text-lg hover:underline">Home</a>
        
        </div>
        <div className="flex items-center gap-4">
          <a href="/hostdashboard" className="font-bold text-lg hover:underline">Back</a>
        
        </div>
         <div className="flex items-center gap-4">
          <a href="/notice" className="font-bold text-lg hover:underline">Add Notice</a>
        
        </div>
        <nav className="flex items-center gap-3">
          <a href="/addteacher" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition">Add Teacher</a>
        </nav>
      </div>
    </header>
  )
}