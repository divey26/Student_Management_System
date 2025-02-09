import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddStudent from "./Components/students/AddStudent";



function App() {
  return (

          <Router>
            <Routes>
              <Route path="/" element={<AddStudent />} />
            

            </Routes>
          </Router>

  );
}


export default App;