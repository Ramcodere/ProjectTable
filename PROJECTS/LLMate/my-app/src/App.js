
// import './App.css';
import '../src/App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from './components/pages/Home';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated to use Routes

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/about' element={<About />} /> */}
          {/* <Route path='/contact' element={<Contact />} /> */}
          {/* <Route path='/users/add' element={<AddUser />} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

