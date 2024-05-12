import React, { useState } from 'react';
function Login() {

    return (
        <div className="container">
            <div className="row">
                <div className='col-3'>

                </div>
                <div className='col-6'>
                    <div className="card card-login mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Connexion</h5>
                            <div className="container mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="loginInput">Login : </label>
                                        <input id="loginInput" type="text" placeholder='Entrez votre login ...' className='form-control'/>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="passwordInput">Mot de passe : </label>
                                        <input id="passwordInput" type="password" placeholder='Entrez votre mot de passe ...' className='form-control'/>
                                    </div>
                                    <div>
                                        <span id="erreur_message" className='d-none text-danger'></span>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="card-link"></a>
                            <a id="connexion" href="#" onClick={login} className="card-link btn btn-primary">Connexion</a>
                        </div>
                    </div>
                </div>
                <div className='col-3'>

                </div>
            </div>
        </div>
    );
}

async function login() {
    var url = localStorage.getItem("url")

    var output = await fetch(url+'/login_check',
    {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'username': document.getElementById('loginInput').value, "password": document.getElementById('passwordInput').value})
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if(data["token"])
        {
            localStorage.setItem("token", data['token']);
            var a = document.createElement('a');
            a.href = "/";
            a.click();
        }
        else
        {
            document.getElementById('erreur_message').textContent = "Mot de passe ou email incorrect !";
            document.getElementById('erreur_message').classList.remove('d-none');
        }
    }).catch((data) => {
        document.getElementById('erreur_message').textContent = "Mot de passe ou email incorrect !";
        document.getElementById('erreur_message').classList.remove('d-none');
    });
}

export default Login;