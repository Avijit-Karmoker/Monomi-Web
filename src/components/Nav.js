import navStyle from '../../styles/Nav.module.css';
import { useTranslation } from 'react-i18next';

const Nav = () => {
    const { t } = useTranslation(['home']);
    return (
        <div>
            <div className={navStyle.nav}>
                <nav className="navbar navbar-expand-lg navbar-light nav container">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={"../assets/images/logo.png"} alt="logo" id="logoImage" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link text-dark" aria-current="page" href="#">{t("home:nav.creators")}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#">{t("home:nav.members")}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark pe-4" href="#">{t("home:nav.contact")}</a>
                                </li>
                                <li className="nav-item">
                                    <button type="button" class="btn btn-success rounded-pill">{t("home:nav.download")}</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Nav;