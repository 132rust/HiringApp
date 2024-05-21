import './App.css';
import Header from './layouts /components/Header';
import Main from './layouts /components/Main';
import Room from './layouts /room/Room';


function App() {
  if (true) {return (<Room />)}
else {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );}
}

export default App;
