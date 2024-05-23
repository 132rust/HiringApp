import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from './layouts /components/Main';
import Room from './layouts /room/Room';
import Register from './layouts /auth/register/Register';
import LogIn from './layouts /auth/login/LogIn';
import NotFound from "./layouts /error/NotFound";




function App() {

  return (

    <div className="App">
        <Routes>
              <Route path='/login' element={<LogIn />}/>
              <Route path='/register' element={<Register/>}/>
              <Route path="*" element={<NotFound />} />
              <Route path='/main' element={<Main/>}/>
              <Route path='/room' element={<Room/>}/>

        </Routes>
    </div>

  );
}


export default App;
