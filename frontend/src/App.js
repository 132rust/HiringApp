import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../src/layouts /components/Main';
import Room from './layouts /room/Room';
import Register from '../src/layouts /auth/register/Register';
import LogIn from '../src/layouts /auth/login/LogIn';
import CreateTest from '../src/layouts /test/CreateTest';
import UpdateTest from '../src/layouts /test/UpdateTest';
import StatisticTest from '../src/layouts /statistics/StatisticTest';
import Check from '../src/layouts /check/Check';
import ProtectedRoute from './layouts /auth/ProtectedRoute';
import Finish from './layouts /Finish/Finish';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check/:room_id" element={<Check />} />
        <Route path="/finish" element={<Finish />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:room_id"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createTest"
          element={
            <ProtectedRoute>
              <CreateTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateTest"
          element={
            <ProtectedRoute>
              <UpdateTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statisticTest"
          element={
            <ProtectedRoute>
              <StatisticTest />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
