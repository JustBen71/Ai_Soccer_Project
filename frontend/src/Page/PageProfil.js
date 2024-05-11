import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Profile() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState({email: ''}); // Utilisez un objet avec une propriété email

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch("http://192.168.1.59:8000/user/", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUser(result); // Supposons que result est un objet avec un email
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    const handleEmailChange = (event) => {
        setUser({...user, email: event.target.value});
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div className="card card-login mt-3">
                            <div className="card-body">
                                <h5 className="card-title">Modification du profil</h5>
                                <div className="container mb-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="loginInput">Login : </label>
                                            <input id="loginInput" type="text" placeholder='Entrez votre login...'
                                                   className='form-control' value={user.email}
                                                   onChange={handleEmailChange}
                                                   readOnly={false} disabled={false}/>
                                        </div>
                                        <div>
                                            <span id="erreur_message" className='d-none text-danger'></span>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="card-link"></a>
                                <a id="editprofile" href="#" className="card-link btn btn-primary" onClick={editProfile}>Mettre à jour</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        );
    }
}

async function editProfile() {
    var token = localStorage.getItem('token')
    console.log(token)
    var output = await fetch('http://192.168.1.59/user/',
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
                //"Content-Transfer-Encoding": "application/json"
            },
            body: JSON.stringify({'email': document.getElementById('loginInput').value})
        }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
        if (data["error"]) {
            document.getElementById('erreur_message').textContent = "Erreur lors de la modification de l'email !";
            document.getElementById('erreur_message').classList.remove('d-none');
        }
        else
        {
            document.getElementById('erreur_message').classList.add('d-none');
            var a = document.createElement('a');
            a.href = "/";
            a.click();
            localStorage.removeItem("token");
        }
    }).catch((data) => {
        document.getElementById('erreur_message').textContent = "Erreur lors de la modification de l'email !";
        document.getElementById('erreur_message').classList.remove('d-none');
    });
}

export default Profile;