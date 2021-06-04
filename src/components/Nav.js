import navStyle from '../../styles/Nav.module.css';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';

const Nav = () => {
    const { t } = useTranslation(['home']);
    return (
        <div className={navStyle.navbar}>
            <div className={navStyle.nav}>
                <nav class="navbar navbar-expand-lg navbar-light container" style={{backgroundColor: "#EDF1F3"}}>
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            <span className={navStyle.image}>
                                <img src={"../assets/images/logo.png"} alt="logo" id="logoImage" />
                            </span>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item" >
                                    <a class="nav-link" href="#">{t("home:nav.creators")}</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">{t("home:nav.members")}</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">{t("home:nav.contact")}</a>
                                </li>
                                <li>
                                    <Button className="rounded-pill">{t("home:nav.download")}</Button>
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