import React from 'react';
import developerStyle from '../../styles/Developer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faExpandArrowsAlt, faGift, faStar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const ForDevelopers = () => {
    const {t} = useTranslation(['home']);
    return (
        <section>
            <div className={developerStyle.developerSection}>
                <div className="row m-0">
                    <div className="col-md-4">
                        <img className={developerStyle.image} src={"../assets/images/Kurejams.png"} alt="" />
                    </div>
                    <div className="col-md-8">
                        <h1 className={developerStyle.headText}>{t("home:creators.head")}</h1>
                        <div>
                            <div className={developerStyle.developerDetail}>
                                <div className={developerStyle.singleDetail}>
                                    <div className={developerStyle.icon1}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faGift} />
                                    </div>
                                    <div>
                                        <h3>{t("home:creators.freePlatform")}</h3>
                                        <p>{t("home:creators.noFees")}</p>
                                    </div>
                                </div>
                                <div className={developerStyle.singleDetail}>
                                    <div className={developerStyle.icon2}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faCreditCard} />
                                    </div>
                                    <div>
                                        <h3>{t("home:creators.income")}</h3>
                                        <p>{t("home:creators.incomeAbout")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={developerStyle.developerDetail}>
                                <div className={developerStyle.singleDetail}>
                                    <div className={developerStyle.icon3}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faStar} />
                                    </div>
                                    <div>
                                        <h3>{t("home:creators.uniqueContent")}</h3>
                                        <p>{t("home:creators.uniqueContentText")}</p>
                                    </div>
                                </div>
                                <div className={developerStyle.singleDetail}>
                                    <div className={developerStyle.icon4}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faExpandArrowsAlt} />
                                    </div>
                                    <div>
                                        <h3>{t("home:creators.awareness")}</h3>
                                        <p>{t("home:creators.awarenessText")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={developerStyle.decision}>
                    <div className={developerStyle.correct}>
                        <h3 className="pb-3">{t("home:creators.decision")}</h3>
                        <p>{t("home:creators.decisionPoint")}:</p>
                        <div className={developerStyle.point}>
                            <div className="pe-3">
                                <ul>
                                    <li>{t("home:creators.variousContent")}</li>
                                    <li>{t("home:creators.athletes")}</li>
                                    <li>{t("home:creators.profit")}</li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>{t("home:creators.institutions")}</li>
                                    <li>{t("home:creators.projects")}</li>
                                    <li>{t("home:creators.association")}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={developerStyle.connect}>
                        <h3>{t("home:creators.contactUs")}</h3>
                        <p>{t("home:creators.createCommunity")}</p>
                        <button type="button" class="btn btn-success rounded-pill">{t("home:creators.contact")}</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForDevelopers;