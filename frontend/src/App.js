import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './layouts /components/Main';
import Room from './layouts /room/Room';
import Register from './layouts /auth/register/Register';
import LogIn from './layouts /auth/login/LogIn';
import CreateTest from './layouts /test/CreateTest';
import UpdateTest from './layouts /test/UpdateTest';
import StatisticTest from './layouts /statistics/StatisticTest';
import Check from './layouts /check/Check';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/room/:room_id" element={<Room />} />
        <Route path="/check/:room_id" element={<Check />} />
        <Route path="/createTest" element={<CreateTest />} />
        <Route path="/updateTest" element={<UpdateTest />} />
        <Route path="/statisticTest" element={<StatisticTest />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
