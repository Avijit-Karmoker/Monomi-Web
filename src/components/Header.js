import React from 'react';
import headerStyles from '../../styles/Header.module.css';

const Header = () => {
    return (
        <section className={headerStyles.header}>
            <div className="row m-0">
                <div className="col-md-6">
                    <div className={headerStyles.headerText}>
                        <h1 className={headerStyles.headerh1}>Jūsų kūryba ir vizija yra <br /> vienijanti jėga</h1>
                        <p className={headerStyles.headerP}>Monomi suteikia galimybę kūrybiškiems žmonėms ir organizacijoms dalintis savo veikla ir suburti bendraminčius, kurie Jus palaiko ir žavisi. Kurkite turinį tokį, kokį norite - nepriklausomą nuo algoritmų ir masinančių antrasčių.
                        </p>
                        <button type="button" class="btn btn-success rounded-pill">Sukurk savo bendruomenę</button>
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