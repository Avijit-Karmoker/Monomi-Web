import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation(['home']);
    return (
        <section>
            <div className="container">
                <div className="row m-0">
                    <div className="col-md-6">
                        <Image
                            src="/../public/assets/images/logo.png"
                            alt="monomi"
                            width="180px"
                            height="50px" />
                        <p>{t("home:footer.link")}</p>
                        <p>{t("home:footer.contact")}</p>
                    </div>
                    <div className="col-md-6">
                        <h5>{t("home:footer.privatePolicy")}</h5>
                        <p>{t("home:footer.copyrightIssue")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;