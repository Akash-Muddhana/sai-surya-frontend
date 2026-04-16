import { useState } from "react"
import { Header } from "../components/header"

export function StudentDetails(){
  const [standard,setStandard]=useState('')
  const [roll,setRoll]=useState('')
  const [loading,setLoading]=useState(false)
  const [show, setShow] = useState(false)

  const isRollValid = roll === '' ? true : /^\d+$/.test(roll)

  const handleShow = (e) => {
    e.preventDefault()
    if(!standard || !roll || !isRollValid) return
    setLoading(true)
    setShow(false)
    setTimeout(() => {
      setLoading(false)
      setShow(true)
    }, 700)
  }

  const handleClear = () => {
    setStandard('')
    setRoll('')
    setShow(false)
  }

  return(

    <>
      <Header />

      <main className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#fffaf0] via-[#fff2e0] to-[#fff0d6] p-6 pt-8 overflow-hidden">

        {/* decorative gradient blobs */}
        <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-gradient-to-r from-amber-200 to-orange-300 opacity-30 filter blur-3xl animate-pulse" aria-hidden></div>
        <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-yellow-200 via-amber-100 to-orange-200 opacity-25 filter blur-3xl animate-pulse" aria-hidden></div>

      <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mt-6 transform transition-all duration-300 hover:-translate-y-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Student Details</h1>
        <p className="text-sm text-gray-600 mb-6">Select the standard and enter the roll number to preview details.</p>

        <form onSubmit={handleShow} className="grid gap-4">
          <label className="block">
            <span className="text-sm text-gray-700">Standard</span>
            <select
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffa31a] transition focus:shadow-md"
            >
              <option value="">-- Choose --</option>
              {Array.from({length:10}, (_,i) => i+1).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Roll Number</span>
            <input
              value={roll}
              placeholder="Enter roll no."
              onChange={(e)=>setRoll(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 rounded-md border ${roll && !isRollValid ? 'border-red-400' : 'border-gray-200'} bg-white focus:outline-none focus:ring-2 focus:ring-[#ffa31a] transition focus:shadow-md`}
            />
            {roll && !isRollValid && (
              <p className="text-xs text-red-600 mt-1">Roll must be numeric</p>
            )}
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!standard || !roll || !isRollValid}
              className={`flex-1 relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium transition-transform ${(!standard || !roll || !isRollValid) ? 'from-[#ffcc80] to-[#ffb56b] bg-gradient-to-r cursor-not-allowed opacity-80' : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-xl active:scale-95'}`}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span className="ml-2">Loading</span>
                </>
              ) : (
                <>
                  <span>Show Details</span>
                  <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>

            <button type="button" onClick={handleClear} className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition">Clear</button>
          </div>
        </form>

        {show && (
          <div className="mt-6 p-4 rounded-lg bg-white shadow-inner border border-yellow-50 transition-transform transform duration-300">
            <p className="text-sm text-gray-700">Standard: <span className="font-semibold">{standard}</span></p>
            <p className="text-sm text-gray-700">Roll Number: <span className="font-semibold">{roll}</span></p>
            <p className="mt-3 text-xs text-gray-600">This preview card appears after you submit — you can use it to integrate a lookup or fetch student info.</p>
          </div>
        )}
      </div>
      </main>
    </>
  )
}