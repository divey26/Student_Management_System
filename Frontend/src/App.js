import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddStudent from "./Components/students/AddStudent";
import ViewAllStudents from "./Components/students/ViewStudent";
import AddMarks from "./Components/Teachers/AddMarks";
import Dash from "./Components/Dashboard";
import Status from "./Components/students/Status";



function App() {
  return (

          <Router>
            <Routes>
            <Route path="/" element={<Dash />} />
            <Route path="/add-std" element={<AddStudent />} />
            <Route path="/students" element={<ViewAllStudents />} />
            <Route path="/sts" element={<Status />} />

            <Route path="/students/:id/marks" element={<AddMarks />} />
            <Route path="/students/:id" element={<ViewAllStudents />} />
            </Routes>
          </Router>

  );
}


export default App;