import CardSkin from "../Component/CardSkin";
import React, { useState, useEffect } from 'react';

function Skin() {

    useEffect(() => {
        getSkin();
    }, []);

    return (
        <div id={"pageSkin"} className="container-fluid">
            <div className={"row"}>
                <div className={"col-4"}>

                </div>
                <div className={"col-4 text-center text-light rounded-pill color-navbar mt-2"}>
                    <h1>Boutique</h1>
                </div>
            </div>
            <div className={"row"}>
                <div id="col" className="col-4 d-none">
                    <div className="card mt-2 card-equipe">
                        <div className="card-body text-center">
                            <h5 id="nomSkin" className="card-title"></h5>
                            <div className="container">
                                <img id="image64" className={"img-skin"}></img>
                            </div>
                            <button id="buttonPayer" className={"btn btn-primary mt-2"}></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getSkin()
{
    var url = localStorage.getItem('url');
    var token = localStorage.getItem('token')
    var output = fetch(url+'/skin/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            if(data["code"])
            {
                localStorage.removeItem("token")
                var a = document.createElement('a')
                a.href = "/"
                a.click()
            }
            else
            {
                var cardSkin
                var row = document.createElement('div')
                row.classList.add('row')
                for(var i = 0; i < data.length; i++)
                {
                    console.log(data);
                    if(data[i]["acheter"])
                    {
                        document.getElementById("nomSkin").textContent = data[i]["nomSkin"];
                        document.getElementById("image64").src = data[i]["base64"];
                        document.getElementById("buttonPayer").textContent = "Déjà acheté";
                    }
                    else
                    {
                        document.getElementById("nomSkin").textContent = data[i]["nomSkin"];
                        document.getElementById("image64").src = data[i]["base64"];
                        document.getElementById("buttonPayer").textContent = data[i]["prix"]+ " €";
                        document.getElementById("buttonPayer").addEventListener('click', function (event) {
                            acheter(event)
                        });
                        document.getElementById("buttonPayer").setAttribute("data-id", data[i]["idSkin"]);
                    }
                    document.getElementById("col").classList.remove("d-none")
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des équipes:', error);
        });
}

function acheter(event){
    var id = event.target.getAttribute("data-id")
    var url = localStorage.getItem("url")
    var token = localStorage.getItem("token")
    var output = fetch(url+'/skin/'+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            var a = document.createElement('a');
            a.href = "/";
            a.click();
        }).catch();
}

export default Skin;