import './App.css'; 
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AddNewApplication from './components/addNewForm/AddNewForm';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='application/add' element={<AddNewApplication/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
