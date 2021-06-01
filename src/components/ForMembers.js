import React from 'react';
import { useTranslation } from 'react-i18next';
import memberStyles from '../../styles/ForMembers.module.css';

const ForMembers = () => {
    const {t} = useTranslation(['home']);
    return (
        <section>
            <div className={memberStyles.memberSection}>
                <div className="row me-0">
                    <div className="col-md-5">
                        <div className={memberStyles.membersText}>
                            <h1>{t("home:member.forMember")}</h1>
                            <p>{t("home:member.grateFor")}</p>
                            <ul>
                                <li>{t("home:member.creators")}</li>
                                <li>{t("home:member.becomeMember")}</li>
                                <li>{t("home:member.uniqueContent")} </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-7 p-0">
                        <div className={memberStyles.image}>
                            <img src={"../assets/images/Nariams.png"} alt="Nariams" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForMembers;