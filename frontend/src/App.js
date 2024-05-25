import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './layouts /components/Main';
import Room from './layouts /room/Room';
import Register from './layouts /auth/register/Register';
import LogIn from './layouts /auth/login/LogIn';
import CreateTest from './layouts /test/CreateTest';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/room" element={<Room />} />
        <Route path="/createTest" element={<CreateTest />} />
        <Route path="*" element={<Navigate to="/login" />} />
        
      </Routes>
    </div>
  );
}

export default App;
