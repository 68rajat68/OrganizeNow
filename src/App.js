
import './App.css';
// import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from './components/Home';
import NavBar from './components/NavBar';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Schedulr from './components/Schedulr';
import Footer from './components/Footer';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }



  return (
    <>
      <NoteState>
        <Router>
          <div className='app-container'>
            <NavBar />
            <Alert alert={alert} />
            <div className='content_main'>
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />} />
                <Route exact path="/Schedulr" element={<Schedulr showAlert={showAlert} />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

