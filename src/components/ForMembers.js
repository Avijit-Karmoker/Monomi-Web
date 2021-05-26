import React from 'react';
import memberStyles from '../../styles/ForMembers.module.css';

const ForMembers = () => {
    return (
        <section>
            <div className={memberStyles.memberSection}>
                <div className="row me-0">
                    <div className="col-md-5">
                        <div className={memberStyles.membersText}>
                            <h1>Nariams</h1>
                            <p>Naudodamiesi Monomi:</p>
                            <ul>
                                <li>Atraskite kūrėjus</li>
                                <li>Tapkite kūrėjų bendruomenės nariais ir kartu darykite teigiamą poveikį</li>
                                <li>Sekite išskirtinį kūrėjų turinį, dalyvaukite bendruomenės diskusijose </li>
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