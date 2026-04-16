import { Header } from "./components/header";
import { Host } from "./pages/host/hostlogin";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./pages/dashboard";
import { StudentDetails } from "./pages/studentDetails";
import { HostDashboard } from "./pages/host/hostdashboard";
import { AddTeacher } from "./pages/host/addteacher";
import { Notice } from "./pages/host/notice";
import { useState } from "react";
function App() {
  const [notice,setNotice]=useState('')
  return (
    <>

      <Routes>
        <Route path="/" element={<Dashboard notice={notice}/>} />
        <Route path="/host" element={<Host />} />
        <Route path="/studentDetails" element={<StudentDetails />} />
        <Route path="/hostdashboard" element={<HostDashboard />} />
        <Route path="/addteacher" element={<AddTeacher />} />
        <Route path="/notice" element={<Notice notice={notice} setNotice={setNotice} />} />
      </Routes>
    </>
  );
}

export default App;
