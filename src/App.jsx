import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './routes/ProtectedRoutes';
import DashboardLayout from './components/layout/DashboardLayout';

// Public pages
import LandingPage from './pages/public/LandingPage';
import AuthPage from './pages/public/AuthPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin portal pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Admission from './pages/admin/Admission';
import AdminFees from './pages/admin/Fees';
import AdminLibrary from './pages/admin/Library';
import Academics from './pages/admin/Academics';
import StaffAttendance from './pages/admin/Attendance';
import Settings from './pages/admin/Setting';
import Hostel from './pages/admin/Hostel';
import PayRoll from './pages/admin/StaffPayRoll';
import AdminCBT from './pages/admin/CBT';
import Communication from './pages/admin/Communications';
import Analytics from './pages/admin/Analytics';
import Allinsight from './pages/admin/Allnsights';
import EditAdmission from './pages/admin/EditStudentAdmission';
import AddStaff from './pages/admin/AddStaff';
import EditStaff from './pages/admin/EditStaff';
import AddCourse from './pages/admin/AddCourse';
import EditCourse from './pages/admin/EditCourse';
import AddProgramme from './pages/admin/AddProgramme';
import EditProgramme from './pages/admin/EditProgramme';

// Teacher portal pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherAttendance from './pages/teacher/Attendance';
import MyClasses from './pages/teacher/MyClasses';
import Reports from './pages/teacher/Reports';
import ScoreEntry from './pages/teacher/ScoreEntry';
import TeacherTimeTable from './pages/teacher/TimeTable';
import Assignment from './pages/teacher/Assignment';

// Student portal pages
import StudentDashboard from './pages/student/StudentDashboard';
import Announcements from './pages/student/Announcement';
import StudentCBT from './pages/student/CBT';
import StudentLibrary from './pages/student/Library';
import Results from './pages/student/Results';
import StudentSchoolFees from './pages/student/StudentSchoolFees';
import StudentTimeTable from './pages/student/TimeTable';
import StudentAttendance from './pages/student/Attendance';

// Parent portal pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentFees from './pages/parent/Fees';
import ChildResults from './pages/parent/ChildResult';
import ChildAttendance from './pages/parent/Attendance';
import StudentReportCard from './pages/parent/ReportCard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoutes role="admin">
                <DashboardLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="admission" element={<Admission />} />
            <Route path="edit-admission/:id" element={<EditAdmission />} />
            <Route path="fees" element={<AdminFees />} />
            <Route path="add-staff" element={<AddStaff />} />
            <Route path="edit-staff/:id" element={<EditStaff />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="edit-course/:id" element={<EditCourse />} />
            <Route path="add-programme" element={<AddProgramme />} />
            <Route path="edit-programme/:id" element={<EditProgramme />} />
            <Route path="cbt" element={<AdminCBT />} />
            <Route path="hostel" element={<Hostel />} />
            <Route path="pay-roll" element={<PayRoll />} />
            <Route path="academics" element={<Academics />} />
            <Route path="setting" element={<Settings />} />
            <Route path="attendance" element={<StaffAttendance />} />
            <Route path="library" element={<AdminLibrary />} />
            <Route path="communications" element={<Communication />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="all-insights" element={<Allinsight />} />
          </Route>

          {/* Teacher routes */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoutes role="teacher">
                <DashboardLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<TeacherDashboard />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="my-classes" element={<MyClasses />} />
            <Route path="reports" element={<Reports />} />
            <Route path="score-entry" element={<ScoreEntry />} />
            <Route path="timetable" element={<TeacherTimeTable />} />
            <Route path="assignment" element={<Assignment />} />
          </Route>

          {/* Student routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoutes role="student">
                <DashboardLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="cbt" element={<StudentCBT />} />
            <Route path="library" element={<StudentLibrary />} />
            <Route path="results" element={<Results />} />
            <Route path="fees" element={<StudentSchoolFees />} />
            <Route path="timetable" element={<StudentTimeTable />} />
            <Route path="attendance" element={<StudentAttendance />} />
          </Route>

          {/* Parent routes */}
          <Route
            path="/parent"
            element={
              <ProtectedRoutes role="parent">
                <DashboardLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<ParentDashboard />} />
            <Route path="fees" element={<ParentFees />} />
            <Route path="results" element={<ChildResults />} />
            <Route path="attendance" element={<ChildAttendance />} />
            <Route path="report-card" element={<StudentReportCard />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;