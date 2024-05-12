import React, { useState } from 'react';
function Register() {

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
                                    <div className="col-12">
                                        <label htmlFor="loginInput">Email : </label>
                                        <input id="loginInput" type="text" placeholder='Entrez votre email ...' className='form-control'/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="col-12">
                                        <label htmlFor="passwordInput">Mot de passe : </label>
                                        <input id="passwordInput" type="password" placeholder='Entrez votre mot de passe ...' className='form-control'/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="col-12">
                                        <label htmlFor="confirmpasswordInput">Confirmer le mot de passe : </label>
                                        <input id="confirmpasswordInput" type="password" placeholder='Confirmer votre mot de passe ...' className='form-control'/>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <span id="erreur_message" className='d-none text-danger'></span>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="card-link"></a>
                            <a id="connexion" href="#" onClick={register} className="card-link btn btn-primary">S'inscrire</a>
                        </div>
                    </div>
                </div>
                <div className='col-3'>

                </div>
            </div>
        </div>
    );
}

async function register() {
    var url = localStorage.getItem("url")

    var output = await fetch(url+'/user/new',
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'username': document.getElementById('loginInput').value, "password": document.getElementById('passwordInput').value, "confirmpassword": document.getElementById('confirmpasswordInput').value})
        }).then((response) => {
        return response.json();
    }).then((data) => {
        if(data["message"])
        {
            document.getElementById('erreur_message').textContent = data["message"];
            document.getElementById('erreur_message').classList.remove('d-none');
        }
        else
        {
            var a = document.createElement('a');
            a.href = "/login";
            a.click();
        }
    }).catch((data) => {

    });
}

export default Register;