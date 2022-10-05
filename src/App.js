import './App.css'; 
import {HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AddNewApplication from './components/addNewForm/AddNewForm';
import Applications from './components/applications/Applications';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='applications' element={<Applications/>}/>
          <Route path='application/add' element={<AddNewApplication/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
