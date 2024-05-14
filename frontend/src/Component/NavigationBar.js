
import React, { useState } from 'react';
import Logo from '../Assets/Image/Logo.png';
import { jwtDecode, JwtPayload } from 'jwt-decode';


function NavigationBar() {
    var connected = false;
    if(localStorage.getItem("token"))
    {
        connected = true;
    }

    return (
        <nav className="navbar navbar-expand-lg color-navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img className="image-radius" height="50px" width="50px" src={Logo}></img></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active text-light" aria-current="page" href="/"><strong>Accueil</strong></a>
                    </li>
                    {connected ? (
                            // Affiche ces liens si l'utilisateur est connecté
                            <>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/match"><strong>Match</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/equipe"><strong>Mes équipes</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/boutique"><strong>Boutique</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/" onClick={logout}><strong>Déconnexion</strong></a>
                                </li>
                            </>
                        ) : (
                            // Affiche ces liens si l'utilisateur n'est pas connecté
                            <>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/login"><strong>Login</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/register"><strong>Inscription</strong></a>
                                </li>
                            </>
                        )}
                </ul>
                </div>
            </div>
        </nav>
    );
}

async function logout() {
    localStorage.removeItem("token");
}
export default NavigationBar;