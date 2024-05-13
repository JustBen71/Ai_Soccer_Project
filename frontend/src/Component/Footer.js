import Logo from "../Assets/Image/Logo.png";

function Footer() {

    return (
        <div id="footer" className="d-flex flex-wrap justify-content-between align-items-center border-top">
            <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                    <img className="image-radius" height="50px" width="50px" src={Logo}></img>
                </a>
                <span className="mb-3 mb-md-0 text-body-secondary text-light">© 2024 Ai_Soccer</span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"></svg></a></li>
                <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"></svg></a></li>
                <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"></svg></a></li>
            </ul>
        </div>
    );
}
export default Footer;