import React from 'react';
import creatorStyle from '../../styles/Creator.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faExpandArrowsAlt, faGift, faStar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const ForDevelopers = () => {
    const {t} = useTranslation(['home']);
    return (
        <section className="bg-white">
            <div className={creatorStyle.developerSection}>
                <div className="row m-0">
                    <div className="col-md-4">
                        <img className={creatorStyle.image} src={"../assets/images/Kurejams.png"} alt="" />
                    </div>
                    <div className="col-md-8">
                        <h1 className={creatorStyle.headText}>{t("home:creators.head")}</h1>
                        <div>
                            <div className={creatorStyle.developerDetail}>
                                <div className={creatorStyle.singleDetail}>
                                    <div className={creatorStyle.icon1}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faGift} />
                                    </div>
                                    <div>
                                        <h3>{t("home:creators.freePlatform")}</h3>
                                        <p>{t("home:creators.noFees")}</p>
                                    </div>
                                </div>
                                <div className={creatorStyle.singleDetail}>
                                    <div className={creatorStyle.icon2}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faCreditCard} />
                                    </div>
                                    <div>
                                        <h3>{t("home:creators.income")}</h3>
                                        <p>{t("home:creators.incomeAbout")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={creatorStyle.developerDetail}>
                                <div className={creatorStyle.singleDetail}>
                                    <div className={creatorStyle.icon3}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faStar} />
                                    </div>
                                    <div>
                                        <h3>{t("home:creators.uniqueContent")}</h3>
                                        <p>{t("home:creators.uniqueContentText")}</p>
                                    </div>
                                </div>
                                <div className={creatorStyle.singleDetail}>
                                    <div className={creatorStyle.icon4}>
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
                <div className={creatorStyle.decision}>
                    <div className={creatorStyle.correct}>
                        <h3 className="pb-3">{t("home:creators.decision")}</h3>
                        <p>{t("home:creators.decisionPoint")}:</p>
                        <div className={creatorStyle.point}>
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
                    <div className={creatorStyle.connect}>
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