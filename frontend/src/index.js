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

const navbar = ReactDOM.createRoot(document.getElementById('navbar'));
navbar.render(
  <React.StrictMode>
    <Navbar/>
  </React.StrictMode>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" />
        <Route path="/match" />
        <Route path="/equipe" />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
