import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddStudent from "./Components/students/AddStudent";
import AddEditTeacher from "./Components/Teachers/AddEditTeacher";



function App() {
  return (

          <Router>
            <Routes>
              <Route path="/" element={<AddStudent />} />
              <Route path="/staffs" element={<AddEditTeacher />} />


            </Routes>
          </Router>

  );
}


export default App;