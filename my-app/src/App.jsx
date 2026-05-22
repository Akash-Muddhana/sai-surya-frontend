import { Header } from "./components/header";
import { Host } from "./pages/host/hostlogin";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./pages/dashboard";
import { StudentDetails } from "./pages/studentDetails";
import { HostDashboard } from "./pages/host/hostdashboard";
import { AddTeacher } from "./pages/host/addteacher";
import { AddStudent } from "./pages/host/addstudent";
import { Notice } from "./pages/host/notice";
import { useState } from "react";
import { TeacherDetails } from "./pages/TeacherDetails";
import { TeacherLogin } from "./pages/teacher/teacherlogin";
import { MarkAttendance } from "./pages/teacher/MarkAttendance";
import { AddMarks } from "./pages/AddMarks";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isTeacherLoggedIn={isTeacherLoggedIn}
        setIsTeacherLoggedIn={setIsTeacherLoggedIn}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/host" element={<Host setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/teacher"
          element={
            <TeacherLogin
              isTeacherLoggedIn={isTeacherLoggedIn}
              setIsTeacherLoggedIn={setIsTeacherLoggedIn}
            />
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            isTeacherLoggedIn ? (
              <Dashboard />
            ) : (
              <TeacherLogin
                isTeacherLoggedIn={isTeacherLoggedIn}
                setIsTeacherLoggedIn={setIsTeacherLoggedIn}
              />
            )
          }
        />

        <Route
          path="/students"
          element={
            <StudentDetails
              isLoggedIn={isLoggedIn}
              isTeacherLoggedIn={isTeacherLoggedIn}
            />
          }
        />
        <Route
          path="/teachers"
          element={
            <TeacherDetails
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/host/dashboard"
          element={
            isLoggedIn ? (
              <HostDashboard />
            ) : (
              <Host setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route
          path="/teachers/add"
          element={
            isLoggedIn ? <AddTeacher /> : <Host setIsLoggedIn={setIsLoggedIn} />
          }
        />

        <Route
          path="/notice"
          element={
            isLoggedIn ? (
              <Notice isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Host setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route
          path="/students/addMarks"
          element={<AddMarks canEdit={isLoggedIn || isTeacherLoggedIn} />}
        />

        <Route
          path="/students/add"
          element={
            isLoggedIn || isTeacherLoggedIn ? (
              <AddStudent
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Host setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/students/attendance"
          element={
            isTeacherLoggedIn ? (
              <MarkAttendance isTeacherLoggedIn={isTeacherLoggedIn} />
            ) : (
              <Host setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
