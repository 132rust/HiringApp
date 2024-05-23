import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './layouts /components/Header';
import Main from './layouts /components/Main';
import Room from './layouts /room/Room';
import Register from './layouts /auth/register/Register';
import SignIn from './layouts /auth/login/SignIn';
import NotFound from "./layouts /error/NotFound";
import {RequireToken} from "./layouts /auth/Auth";



function App() {

  return (

    <div className="App">
        <Routes>
              <Route path='/' element={<SignIn />}/>
              <Route path='/register' element={<Register/>}/>
              <Route path="*" element={<NotFound />} />
              <Route path='/main' element={<RequireToken><Header/><Main/></RequireToken>}/>
              <Route path='/room' element={<RequireToken><Header/><Room/></RequireToken>}/>

        </Routes>
    </div>

  );
}


export default App;
