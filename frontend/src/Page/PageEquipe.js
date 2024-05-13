import React, { useState } from 'react';

function Equipe() {
    // Création d'un tableau de 11 joueurs
    const joueurs = Array.from({ length: 11 }).map((_, index) => ({
        id: index + 1,
        nom: '',
        prenom: '',
        age: '',
        poste: '',
        description: ''
    }));

    // Fonction pour générer les rows et les colonnes
    const renderJoueurs = () => {
        let rows = [];
        var row = (<div className="row">
            <div className={"col-5"}>

            </div>
            <div className={"col-2"}>
                <div className="card mt-2 card-equipe">
                    <div className="card-body">
                        <label htmlFor={"nomequipe"}>Nom de l'équipe : </label>
                        <input type="text" className="form-control" id={`nomequipe`} name={`nomequipe`} placeholder="Nom de l'équipe ..." />
                        <span id={`nomequipe_erreur`} name={`nomequipe_erreur`} className={"text-danger"}></span>
                    </div>
                </div>
            </div>
            <div className={"col-5"}>

            </div>
        </div>);
        rows.push(row)
        for (let i = 0; i < joueurs.length; i += 4) {
            let rowItems = joueurs.slice(i, i + 4).map(joueur => (
                <div className="col-md-3" id={joueur.id}>
                    <div className="card mt-2 card-equipe">
                        <div className="card-body">
                            <h5 className="card-title">Joueur n°{joueur.id}</h5>
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor={`joueur_${joueur.id}_nom`}>Nom</label>
                                        <input type="text" className="form-control" id={`joueur_${joueur.id}_nom`} name={`joueur_${joueur.id}_nom`} placeholder="Nom ..." />
                                        <span id={`joueur_${joueur.id}_nom_erreur`} name={`joueur_${joueur.id}_nom_erreur`} className={"text-danger"}></span>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor={`joueur_${joueur.id}_prenom`}>Prénom</label>
                                        <input type="text" className="form-control" id={`joueur_${joueur.id}_prenom`} name={`joueur_${joueur.id}_prenom`} placeholder="Prénom ..." />
                                        <span id={`joueur_${joueur.id}_prenom_erreur`} name={`joueur_${joueur.id}_prenom_erreur`} className={"text-danger"}></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label htmlFor={`joueur_${joueur.id}_age`}>Age</label>
                                        <input type="number" className="form-control" id={`joueur_${joueur.id}_age`} name={`joueur_${joueur.id}_age`} placeholder="Age ..." min="0" max="255" />
                                        <span id={`joueur_${joueur.id}_age_erreur`} name={`joueur_${joueur.id}_nom_erreur`} className={"text-danger"}></span>
                                    </div>
                                    <div className="col-8">
                                        <label htmlFor={`joueur_${joueur.id}_poste`}>Poste</label>
                                        <select id={`joueur_${joueur.id}_poste`} className="form-control">
                                            <option value="G">Gardien (G)</option>
                                            <option value="DD">Défenseur Droit (D D)</option>
                                            <option value="DG">Défenseur Gauche (D G)</option>
                                            <option value="DC">Défenseur Central (D C)</option>
                                            <option value="MDG">Milieu Défensif Gauche (MD G)</option>
                                            <option value="MDD">Milieu Défensif Droit (MD D)</option>
                                            <option value="MDC">Milieu Défensif Central (MD C)</option>
                                            <option value="MG">Milieu Gauche (M G)</option>
                                            <option value="MD">Milieu Droit (M D)</option>
                                            <option value="MC">Milieu Central (M C)</option>
                                            <option value="MOG">Milieu Offensif Gauche (MO G)</option>
                                            <option value="MOD">Milieu Offensif Droit (MO D)</option>
                                            <option value="MOC">Milieu Offensif Axial (MO C)</option>
                                            <option value="AG">Attaquant Gauche (A G)</option>
                                            <option value="AD">Attaquant Droit (A D)</option>
                                            <option value="AC">Attaquant Axial (A C)</option>
                                        </select>
                                        <span id={`joueur_${joueur.id}_poste_erreur`} name={`joueur_${joueur.id}_poste_erreur`} className={"text-danger"}></span>
                                    </div>
                                </div>
                                <div className="row">
                                <div className="col-12">
                                        <label htmlFor={`joueur_${joueur.id}_description`}>Description</label>
                                        <input type="text" className="form-control" id={`joueur_${joueur.id}_description`} name={`joueur_${joueur.id}_description`} maxLength="255" placeholder="Description (physique, mental) ..." />
                                        <span id={`joueur_${joueur.id}_description_erreur`} name={`joueur_${joueur.id}_description_erreur`} className={"text-danger"}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ));
            rows.push(<div className="row" id={i}>{rowItems}</div>);
        }
        return rows;
    }

    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col-4"}>

                </div>
                <div className={"col-4 text-center text-light rounded-pill color-navbar mt-2"}>
                    <h1>Création de votre équipe</h1>
                </div>
            </div>
            {renderJoueurs()}
            <div className={"row"}>
                <div className={"col-5"}>

                </div>
                <div className={"col-2 text-center mt-2 mb-2"}>
                    <button id={"buttonEquipe"} className={"btn btn-primary"} onClick={newEquipe}>Valider l'équipe</button>
                </div>
                <div className={"col-5"}>

                </div>
            </div>
        </div>
    );
}

async function newEquipe() {
    if(localStorage.getItem('token'))
    {
        var token = localStorage.getItem("token")
        var joueurs = []
        for(var i = 1; i < 12; i++)
        {
            joueurs[i-1] = {}
            joueurs[i-1]["nom"] = document.getElementById('joueur_'+i+'_nom').value
            joueurs[i-1]["prenom"] = document.getElementById('joueur_'+i+'_prenom').value
            joueurs[i-1]["age"] = document.getElementById('joueur_'+i+'_age').value
            joueurs[i-1]["poste"] = document.getElementById('joueur_'+i+'_poste').options[document.getElementById('joueur_'+i+'_poste').selectedIndex].value
            joueurs[i-1]["description"] = document.getElementById('joueur_'+i+'_description').value
        }
        var url = localStorage.getItem("url")
        var output = await fetch(url+'/equipe/new',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({'joueurs': joueurs, 'nomequipe': document.getElementById('nomequipe').value})
            }).then((response) => {
            return response.json();
        }).then((data) => {
            if(data["code"])
            {
                if(data["code"] == 401)
                {
                    localStorage.removeItem("token");
                    var a = document.createElement('a');
                    a.href = "/";
                    a.click();
                }
            }
            if(verificationDonnees(data))
            {
                var a = document.createElement('a');
                a.href = "/";
                a.click();
            }
        }).catch((data) => {

        });
    }
}

function verificationDonnees(data) {
    var spans = document.querySelectorAll('span')
    for(var i = 0; i < spans.length; i++)
    {
       spans[i].textContent = ""
    }
    var donneeOk = true
    if(data.length >= 1)
    {
        donneeOk = false
        if(data[0])
        {
            if(data[0]["champs"] == "nomequipe")
            {
                document.getElementById("nomequipe_erreur").textContent = data[0]["message"]
            }
        }
        for (const index of data.keys()) {
            document.getElementById("joueur_"+(index+1)+"_"+data[index]["champs"]+"_erreur").textContent = data[index]["message"]
        }
    }

    return donneeOk
}

export default Equipe;