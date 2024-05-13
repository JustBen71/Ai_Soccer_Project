import React, { useState, useEffect } from 'react';

function MatchIA() {
    useEffect(() => {
        apiMatch(); // Appel de l'API à la création du composant
    }, []);

    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col-4"}>
                </div>
                <div className={"col-4 text-center rounded-pill color-navbar mt-2"}>
                    <h2 className={"text-light"}>Match en cours</h2>
                </div>
                <div className={"col-1"}>

                </div>
                <div className={"col-2"}>
                    <button id={"recommencerMatch"} className={"btn btn-primary mt-2"} onClick={recommencerMatch} disabled>Recommencer le match</button>
                </div>
                <div className={"col-1"}>

                </div>
            </div>
            <div className={"row container-fluid border-top border-light border-4 mt-2"}>
                <div className={"col-10"}>
                    <div className={"container-fluid"}>
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <ul id={"listeAction"} className={"list-group list-group-flush d-none mt-2"}>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"col-2 border-start border-4"}>
                    <div id="actionResumer" className={"container-fluid"}>
                        <div className={"row"}>
                            <div className={"col-12 text-center"}>
                                <div className={"container"}>
                                    <div className={"row text-center"}>
                                        <div className={"col-4 text-light"}>
                                            Vous
                                        </div>
                                        <div className={"col-4 text-light"}>
                                            -
                                        </div>
                                        <div className={"col-4 text-light"}>
                                            Adversaires
                                        </div>
                                    </div>
                                    <div className={"row text-center"}>
                                        <div id="vous" className={"col-4 text-light"}>
                                            0
                                        </div>
                                        <div className={"col-4 text-light"}>
                                            -
                                        </div>
                                        <div id="eux" className={"col-4 text-light"}>
                                            0
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row mb-2"}>
                            <div className={"col-12 text-center"}>
                                <button id="buttonAction" className="btn btn-primary" disabled>
                                    <span id="spinner_id" className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span id="chargement" role="status"> Chargement ...</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

async function apiMatch()
{
    var url = localStorage.getItem("url")
    var token = localStorage.getItem("token")
    var idEquipe = localStorage.getItem("idEquipe")
    var output = await fetch(url+'/match/'+idEquipe, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    }) // Remplace cette URL par l'URL de ton API
        .then(response => response.json())
        .then(data => {
            if(data["code"] == 401)
            {
                localStorage.removeItem("token");
                var a = document.createElement('a');
                a.href = "/";
                a.click();
            }
            if(data["actions"].length >= 1)
            {
                var ul = document.getElementById("listeAction")
                for(var i = 0; i < data["actions"].length; i++)
                {
                    var li = document.createElement('li')
                    li.textContent = data["actions"][i]["minute"] != null ? data["actions"][i]["description"]+" "+data["actions"][i]["minute"]+ "\"" : data["actions"][i]["description"]
                    li.setAttribute("data-score", data["actions"][i]["score"])
                    li.setAttribute("data-minute", data["actions"][i]["minute"])
                    var joueur_involve = ""
                    for(var j = 0; j < data["actions"][i]["joueur_involve"].length; j++)
                    {
                        if(j != 0)
                        {
                            joueur_involve += ","+data["actions"][i]["joueur_involve"][j]
                        }
                        else
                        {
                            joueur_involve += data["actions"][i]["joueur_involve"][j]
                        }
                    }
                    li.setAttribute("data-joueur-involve", joueur_involve)
                    li.classList.add("list-group-item")
                    if(i != 0)
                    {
                        li.classList.add('d-none')
                    }
                    else
                    {
                        var score = data["actions"][i]["score"].split("-");
                        document.getElementById("vous").textContent = score[0];
                        document.getElementById("eux").textContent = score[1];
                    }
                    ul.append(li)
                }
                document.getElementById("buttonAction").removeAttribute('disabled')
                document.getElementById("listeAction").classList.remove("d-none")
                document.getElementById("spinner_id").remove()
                document.getElementById("chargement").remove()
                document.getElementById("buttonAction").textContent = "Action suivante >>>"
                document.getElementById("buttonAction").addEventListener("click", toButton)
                document.getElementById("recommencerMatch").removeAttribute("disabled")
                document.getElementById("recommencerMatch").addEventListener('click', recommencerMatch)
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des équipes:', error);
        });
}

function nextAction()
{
    var lis = document.querySelectorAll('#listeAction > li')
    for(var i = 0; i < lis.length; i++)
    {
        if(lis[i].classList.contains("d-none"))
        {
            if((i+1) >= lis.length)
            {
                document.getElementById("buttonAction").removeEventListener("click", toButton)
                document.getElementById("buttonAction").addEventListener("click", function () {
                    retourHome()
                })
                document.getElementById("click", function () {
                    retourHome()
                })
                document.getElementById("buttonAction").textContent = "Fin du match"
            }
            lis[i].classList.remove("d-none")
            var score = lis[i].getAttribute('data-score');
            score = score.split("-")
            document.getElementById("vous").textContent = score[0];
            document.getElementById("eux").textContent = score[1];
            break
        }
    }
}

function toButton() {
    nextAction()
}

function retourHome()
{
    var a = document.createElement('a');
    a.href = "/";
    a.click();
}

function recommencerMatch()
{
    window.location.reload()
}


export default MatchIA;