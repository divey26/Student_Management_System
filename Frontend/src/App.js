import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import SignUp from "./Components/common/signup";
import Login from "./Components/common/Login";

import AddTr from "./Components/Teachers/AddEditTeacher";

import AddStudent from "./Components/students/AddStudent";
import ViewAllStudents from "./Components/students/ViewStudent";
import AddMarks from "./Components/Teachers/AddMarks";
import Dash from "./Components/Dashboard";
import Status from "./Components/students/Status";



function App() {
  return (

          <Router>
            <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />

            <Route path="/dash" element={<Dash />} />
            <Route path="/add-std" element={<AddStudent />} />
            <Route path="/sts" element={<Status />} />

            <Route path="/students/:id/marks" element={<AddMarks />} />
            <Route path="/students" element={<ViewAllStudents />} />



            <Route path="/addTr" element={<AddTr />} />

            </Routes>
          </Router>

  );
}


export default App;