import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//common
import SignUp from "./Components/common/signup";
import Login from "./Components/common/Login";

//Admin
import AddTr from "./Components/Admin/AddEditTeacher";
import Dash from "./Components/Admin/Dashboard";
import Class from "./Components/Admin/Class";
import Admin from "./Components/Admin/Admin";
import AddStudent from "./Components/Admin/AddStudent";

//Teachers
import ViewAllStudents from "./Components/Teachers/ViewStudent";
import AddMarks from "./Components/Teachers/AddMarks";
import AddAnoun from "./Components/Teachers/AddAnounce";

//Students
import Status from "./Components/students/Status";
import Announ from "./Components/students/Announcement";



import Layout from "./Layout"
import { AuthProvider } from "./Components/common/authContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Common Routes (Without Layout) */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />

          {/* Protected Routes (With Layout) */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  {/* Admin */}
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/dash" element={<Dash />} />
                  <Route path="/add-std" element={<AddStudent />} />
                  <Route path="/students" element={<ViewAllStudents />} />
                  <Route path="/addTr" element={<AddTr />} />
                  <Route path="/students/grade/:grade" element={<Class />} />

                  {/* Students */}
                  <Route path="/sts" element={<Status />} />
                  <Route path="/Announ" element={<Announ />} />

                  {/* Teachers */}
                  <Route path="/students/:id/marks" element={<AddMarks />} />
                  <Route path="/AddAnoun" element={<AddAnoun />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}



export default App;