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
                console.log(data)
                setTeams(data);
                if (data.length > 0) {
                    setSelectedTeam(data[0].id);  // Sélectionne par défaut la première équipe
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
                <div className={"col-4 text-center"}>
                    <h2 className={"text-light"}>Création du match</h2>
                </div>
                <div className={"col-4"}>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-8"}>

                </div>
                <div className={"col-4"}>
                    <select value={selectedTeam} onChange={handleTeamChange} className={"form-control"}>
                        {teams.map(team => (
                            <option key={team.idEquipe} value={team.idEquipe}>
                                {team.nomEquipe}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Match;