import NavigationBar from "./NavigationBar";

function CardSkin(nomSkin, photoSkin, prixSkin, idSkin, skinAcheter) {

    return (
        <div className="col-4">
            <div className="card mt-2 card-equipe">
                <div className="card-body">
                    <h5 className="card-title">{nomSkin}</h5>
                    <div className="container">
                        <img src={photoSkin}></img>
                    </div>
                    <button id={skinAcheter == true ? idSkin : "buy"} className={"btn btn-secondary"} onClick={skinAcheter == true ? "" : acheter}>{skinAcheter == true ? "Déjà acheté" : prixSkin}</button>
                </div>
            </div>
        </div>
    );
}

function acheter()
{
    console.log("acheter")
}

export default CardSkin;