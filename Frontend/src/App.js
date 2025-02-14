import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//common
import SignUp from "./Components/common/signup";
import Login from "./Components/common/Login";

//Admin
import AddTr from "./Components/Admin/AddEditTeacher";
import Dash from "./Components/Dashboard";
import Class from "./Components/Admin/Class";
import Admin from "./Components/Admin/Admin";
import AddStudent from "./Components/Admin/AddStudent";

//Teachers
import ViewAllStudents from "./Components/Teachers/ViewStudent";
import AddMarks from "./Components/Teachers/AddMarks";

//Students
import Status from "./Components/students/Status";



function App() {
  return (

          <Router>
            <Routes>
              {/*Common */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />

              {/*Admin */}
             
            <Route path="/admin" element={<Admin />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="/add-std" element={<AddStudent />} />
            <Route path="/students" element={<ViewAllStudents />} />
            <Route path="/addTr" element={<AddTr />} />


          <Route path="/students/grade/:grade" element={<Class />} />


              {/*STUDENTS */}
          
            <Route path="/sts" element={<Status />} />

              {/*TEACHERS */}

            <Route path="/students/:id/marks" element={<AddMarks />} />
            <Route path="/students" element={<ViewAllStudents />} />




            </Routes>
          </Router>

  );
}


export default App;