import React from 'react';
import developerStyle from '../styles/Developer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faExpandArrowsAlt, faGift, faStar } from '@fortawesome/free-solid-svg-icons';

const ForDevelopers = () => {
    return (
        <section>
            <div className={developerStyle.developerSection}>
                <div className="row m-0">
                    <div className="col-md-4">
                        <img className={developerStyle.image} src={"../images/Kurejams.png"} alt="" />
                    </div>
                    <div className="col-md-8">
                        <h1 className={developerStyle.headText}>Kūrėjams</h1>
                        <div>
                            <div className={developerStyle.developerDetail}>
                                <div className={developerStyle.singleDetail}>
                                    <div className={developerStyle.icon1}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faGift} />
                                    </div>
                                    <div>
                                        <h3>Nemokama platforma</h3>
                                        <p>Jokių mokesčių kūrėjams - aišku ir paprasta.</p>
                                    </div>
                                </div>
                                <div className={developerStyle.singleDetail}>
                                    <div className={developerStyle.icon2}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faCreditCard} />
                                    </div>
                                    <div>
                                        <h3>Finansinis stabilumas - pastovios pajamos</h3>
                                        <p>Galimybė augti ir tobulėti vien bendruomenės narių palaikymu.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={developerStyle.developerDetail}>
                                <div className={developerStyle.singleDetail}>
                                    <div className={developerStyle.icon3}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faStar} />
                                    </div>
                                    <div>
                                        <h3>Unikalus turinys</h3>
                                        <p>Monomi platformoje galite dalintis išskirtiniu turiniu su savo bendruomenės nariais, vesti aktualias diskusijas.</p>
                                    </div>
                                </div>
                                <div className={developerStyle.singleDetail}>
                                    <div className={developerStyle.icon4}>
                                        <FontAwesomeIcon style={{ width: '20px' }} icon={faExpandArrowsAlt} />
                                    </div>
                                    <div>
                                        <h3>Plėtra ir žinomumas</h3>
                                        <p>Galimybė padidinti savo žinomumą ir surasti daugiau bendraminčių.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={developerStyle.decision}>
                    <div className={developerStyle.correct}>
                        <h3 className="pb-3">Ar Monomi tinka man?</h3>
                        <p>Greičiausiai taip. Monomi teikia naudą šioms ir kitoms veiklos formoms:</p>
                        <div className={developerStyle.point}>
                            <div className="pe-3">
                                <ul>
                                    <li>Turinio kūrėjams</li>
                                    <li>Sportininkams</li>
                                    <li>Organizacijoms ir viešosioms</li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>įstaigoms</li>
                                    <li>Projektamsv</li>
                                    <li>Asociacijoms</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={developerStyle.connect}>
                        <h3>Susisiekite su mumis</h3>
                        <p>ir kurkite bendruomenę jau dabar!</p>
                        <button type="button" class="btn btn-success rounded-pill">Parsisiųsti</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForDevelopers;