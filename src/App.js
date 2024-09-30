
import './App.css';

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
import { useState, useEffect } from 'react';
import Schedulr from './components/Schedulr';
import Footer from './components/Footer';




function App() {
  const host = "https://inotebook-backend-ixb2.onrender.com"
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVerticalLayout, setIsVerticalLayout] = useState(true);
  const [gridNo,setGridNo] = useState(0);

  // useEffect(() => {
  //   console.log(gridNo + " ");
  // }, [gridNo]);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${host}/`, {
          method: "GET"
        });
        const json = await response;
        console.log(json);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    }
    getNotes();
  }, []);

  const changeLayout = () => {
    setIsVerticalLayout(!isVerticalLayout);
  }

  return (
    <>
      <NoteState>
        <Router>
          <div className='app-container'>
            <NavBar changeLayout={changeLayout} layout={isVerticalLayout === true ? 1 : 0} />

            <div className='content_main'>
              <Alert alert={alert} loading={loading} msg={'Waiting for backend to start...'} />
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} layout={isVerticalLayout === true ? 1 : 0} gridNo={gridNo} setGridNo={setGridNo}/>} />
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

