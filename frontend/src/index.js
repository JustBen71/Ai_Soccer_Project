import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './Page/PageLogin';
import Navbar from './Component/NavigationBar';
import Accueil from './Page/PageAccueil';
import './App.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Page/PageProfil';
import Equipe from "./Page/PageEquipe";
import Register from "./Page/PageRegister";
import Match from "./Page/PageMatch";
import MatchIA from "./Page/PageMatchIa";
import Footer from "./Component/Footer";
//require('dotenv').config()

localStorage.setItem("url", "http://192.168.35.23")
const navbar = ReactDOM.createRoot(document.getElementById('navbar'));
navbar.render(
  <React.StrictMode>
    <Navbar/>
  </React.StrictMode>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route path="/" element={<Accueil/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={localStorage.getItem("token") ? <Accueil/> : <Register/>}/>
        <Route path="/match" element={localStorage.getItem("token") ? <Match/> : <Accueil/>}/>
        <Route path="/match/:id" element={localStorage.getItem("token") ? <MatchIA/> : <Accueil/>}/>
        <Route path="/equipe" element={localStorage.getItem("token") ? <Equipe/> : <Accueil/>}/>
      </Routes>
    </Router>
);

const footer = ReactDOM.createRoot(document.getElementById('footer'));
footer.render(
    <React.StrictMode>
        <Footer/>
    </React.StrictMode>
)

reportWebVitals();
