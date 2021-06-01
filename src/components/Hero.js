import React from 'react';
import { useTranslation } from 'react-i18next';
import headerStyles from '../../styles/Header.module.css';

const Header = () => {
    const { t, i18next } = useTranslation(['home']);
    return (
        <section className={headerStyles.header}>
            <div className="row m-0">
                <div className="col-md-6">
                    <div className={headerStyles.headerText}>
                        <h1 className={headerStyles.headerh1}>{t("home:hero.heading")}</h1>
                        <p className={headerStyles.headerP}>{t("home:hero.about")}</p>
                        <button type="button" class="btn btn-success rounded-pill">{t("home:hero.callToAction")}</button>
                    </div>
                </div>
                <div className="col-md-6 p-0">
                    <div className={headerStyles.image}>
                        <img src={"../assets/images/Hero.png"} alt="img" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;