import React, { useState, useEffect } from 'react';

function Match() {
    const [teams, setTeams] = useState([]);  // Pour stocker les équipes
    const [selectedTeam, setSelectedTeam] = useState(''); // Pour stocker l'équipe sélectionnée

    useEffect(() => {
        var url = localStorage.getItem('url')
        var token = localStorage.getItem('token')
        fetch(url+'/equipe', {
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
                if(data.length >= 1)
                {
                    setTeams(data);
                    if (data.length > 0) {
                        setSelectedTeam(data[0].id);  // Sélectionne par défaut la première équipe
                    }
                }
                else
                {
                    var a = document.createElement('a')
                    a.href = "/equipe"
                    a.click()
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des équipes:', error);
            });
    }, []);

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-4"}>
                </div>
                <div className={"col-4 text-center rounded-pill color-navbar mt-2"}>
                    <h2 className={"text-light"}>Création du match</h2>
                </div>
                <div className={"col-4"}>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-4"}>

                </div>
                <div className={"col-4"}>
                    <div className="card mt-2 card-equipe">
                        <div className="card-body">
                            <label htmlFor={"select_equipe"}>Choisir une équipe : </label>
                            <select id={"select_equipe"} name={"select_equipe"} value={selectedTeam} onChange={handleTeamChange} className={"form-control"}>
                                {teams.map(team => (
                                    <option id={team.idEquipe} value={team.idEquipe}>
                                        {team.nomEquipe}
                                    </option>
                                ))}
                            </select>
                            <button id={"launchMatch"} onClick={launchMatch} className={"btn btn-success mt-2"}>Lancer le match</button>
                        </div>
                    </div>
                </div>
                <div className={"col-4"}>

                </div>
            </div>
        </div>
    );
}

async function launchMatch()
{
    if(localStorage.getItem("url"))
    {
        if(localStorage.getItem("token"))
        {
            var url = localStorage.getItem("url")
            var token = localStorage.getItem("token")
            localStorage.setItem("idEquipe", document.getElementById("select_equipe").options[document.getElementById("select_equipe").selectedIndex].value)
            var a = document.createElement('a')
            a.href = "/match/"+localStorage.getItem("idEquipe")
            a.click()
        }
        else
        {
            localStorage.removeItem("token")
            var a = document.createElement('a')
            a.href = "/"
            a.click()
        }
    }
    else
    {
        localStorage.removeItem("token")
        var a = document.createElement('a')
        a.href = ""
        a.click()
    }
}

export default Match;